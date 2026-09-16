import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { db, auth, isFirebaseConfigured } from '@/lib/firebase';
import {
  DEFAULT_SETTINGS,
  type Settings,
  type User,
  type Session,
} from '@/lib/types';

// Convert Firebase User to App User/Session
function toAppSession(user: FirebaseUser | null, token: string = ''): Session | null {
  if (!user) return null;
  return {
    access_token: token,
    token_type: 'bearer',
    user: {
      id: user.uid,
      email: user.email || '',
      role: 'admin',
      user_metadata: {
        name: user.displayName || user.email || 'प्रशासक',
      },
    },
  };
}

// Clean undefined values to prevent Firestore "Unsupported field value: undefined" errors
function cleanFirestoreData(data: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      cleaned[key] = null;
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

// Fallback local storage keys (used only if Firebase config is missing)
const FALLBACK_KEYS = {
  SETTINGS: 'wg_db_settings_v1',
  ANNOUNCEMENTS: 'wg_db_announcements_v1',
  EVENTS: 'wg_db_events_v1',
  YEARS: 'wg_db_years_v1',
  ALBUMS: 'wg_db_albums_v1',
  SESSION: 'wg_db_auth_session_v1',
};

function getFallback<T>(key: string, def: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : def;
  } catch {
    return def;
  }
}

function setFallback<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

type AuthListener = (event: string, session: Session | null) => void;
const listeners: Set<AuthListener> = new Set();
let currentSession: Session | null = null;

if (isFirebaseConfigured) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const token = await firebaseUser.getIdToken();
        currentSession = toAppSession(firebaseUser, token);
      } catch {
        currentSession = toAppSession(firebaseUser, '');
      }
      listeners.forEach((cb) => cb('SIGNED_IN', currentSession));
    } else {
      currentSession = null;
      listeners.forEach((cb) => cb('SIGNED_OUT', null));
    }
  });
}

const firebaseAuthClient = {
  async getSession(): Promise<{ data: { session: Session | null }; error: null }> {
    if (isFirebaseConfigured) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          currentSession = toAppSession(currentUser, token);
        } catch {
          currentSession = toAppSession(currentUser, '');
        }
      } else {
        currentSession = null;
      }
      return { data: { session: currentSession }, error: null };
    }

    const fallback = getFallback<Session | null>(FALLBACK_KEYS.SESSION, null);
    return { data: { session: fallback }, error: null };
  },

  onAuthStateChange(callback: AuthListener) {
    listeners.add(callback);

    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken().catch(() => '');
          const s = toAppSession(firebaseUser, token);
          callback('SIGNED_IN', s);
        } else {
          callback('SIGNED_OUT', null);
        }
      });

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              listeners.delete(callback);
              unsubscribe();
            },
          },
        },
      };
    }

    const fallback = getFallback<Session | null>(FALLBACK_KEYS.SESSION, null);
    setTimeout(() => callback('INITIAL_SESSION', fallback), 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            listeners.delete(callback);
          },
        },
      },
    };
  },

  async signInWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    data: { user: User | null; session: Session | null };
    error: { message: string } | null;
  }> {
    if (!email.trim()) {
      return { data: { user: null, session: null }, error: { message: 'ईमेल आवश्यक आहे' } };
    }
    if (!password) {
      return { data: { user: null, session: null }, error: { message: 'पासवर्ड आवश्यक आहे' } };
    }

    if (isFirebaseConfigured) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const token = await cred.user.getIdToken();
        const session = toAppSession(cred.user, token);
        currentSession = session;
        return { data: { user: session?.user ?? null, session }, error: null };
      } catch (err: any) {
        let msg = err.message || 'लॉगिन अयशस्वी झाले';
        if (
          err.code === 'auth/invalid-credential' ||
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/user-not-found'
        ) {
          msg = 'अवैध ईमेल किंवा पासवर्ड. कृपया पुन्हा तपासा.';
        } else if (err.code === 'auth/invalid-email') {
          msg = 'अवैध ईमेल पत्ता.';
        }
        return { data: { user: null, session: null }, error: { message: msg } };
      }
    }

    const user: User = {
      id: 'demo-admin-id',
      email: email.trim().toLowerCase(),
      role: 'admin',
      user_metadata: { name: 'Admin (Demo)' },
    };
    const session: Session = {
      access_token: 'demo-token-' + Date.now(),
      token_type: 'bearer',
      user,
    };
    setFallback(FALLBACK_KEYS.SESSION, session);
    listeners.forEach((cb) => cb('SIGNED_IN', session));
    return { data: { user, session }, error: null };
  },

  async signOut(): Promise<{ error: null }> {
    if (isFirebaseConfigured) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error('Sign out error:', err);
      }
    }
    setFallback(FALLBACK_KEYS.SESSION, null);
    currentSession = null;
    listeners.forEach((cb) => cb('SIGNED_OUT', null));
    return { error: null };
  },
};

// Firestore Query Builder
export class FirestoreQueryBuilder implements PromiseLike<any> {
  private tableName: string;
  private filters: Array<{ column: string; value: any }> = [];
  private orderColumn: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private isCountQuery = false;
  private isHeadOnly = false;
  private action: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private insertPayload: any = null;
  private updatePayload: any = null;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(_columns: string = '*', options?: { count?: 'exact'; head?: boolean }) {
    this.action = 'select';
    if (options?.count === 'exact') {
      this.isCountQuery = true;
    }
    if (options?.head) {
      this.isHeadOnly = true;
    }
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ column, value });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderColumn = column;
    this.orderAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  insert(data: any | any[]) {
    this.action = 'insert';
    this.insertPayload = data;
    return this;
  }

  update(data: any) {
    this.action = 'update';
    this.updatePayload = data;
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }

  async single() {
    const res = await this.execute();
    const item = Array.isArray(res.data) ? res.data[0] || null : res.data;
    return { data: item, error: item ? null : { message: 'Row not found' } };
  }

  async maybeSingle() {
    const res = await this.execute();
    const item = Array.isArray(res.data) ? res.data[0] || null : res.data;
    return { data: item, error: null };
  }

  private async fetchTableDocs(): Promise<any[]> {
    if (!isFirebaseConfigured) {
      if (this.tableName === 'settings') {
        return getFallback<Settings[]>(FALLBACK_KEYS.SETTINGS, [DEFAULT_SETTINGS]);
      }
      return getFallback<any[]>(
        FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
          `wg_${this.tableName}`,
        []
      );
    }

    try {
      if (this.tableName === 'settings') {
        const docRef = doc(db, 'settings', '1');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return [{ id: 1, ...snap.data() }];
        } else {
          return [DEFAULT_SETTINGS];
        }
      }

      const colRef = collection(db, this.tableName);
      const snapshot = await getDocs(colRef);
      const remoteDocs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      const key =
        FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
        `wg_${this.tableName}`;
      setFallback(key, remoteDocs);
      return remoteDocs;
    } catch (err: any) {
      console.warn(`Firestore read notice (${this.tableName}):`, err?.message || err);
      const key =
        FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
        `wg_${this.tableName}`;
      if (this.tableName === 'settings') return getFallback<Settings[]>(key, [DEFAULT_SETTINGS]);
      return getFallback<any[]>(key, []);
    }
  }

  private async execute(): Promise<{ data: any; count?: number; error: any }> {
    // 1. INSERT
    if (this.action === 'insert') {
      const toInsert = Array.isArray(this.insertPayload)
        ? this.insertPayload
        : [this.insertPayload];

      const insertedItems: any[] = [];

      for (let i = 0; i < toInsert.length; i++) {
        const item = toInsert[i];
        const record = cleanFirestoreData({
          ...item,
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString(),
        });

        if (isFirebaseConfigured) {
          try {
            if (record.id) {
              await setDoc(doc(db, this.tableName, String(record.id)), record);
              insertedItems.push(record);
            } else {
              const docRef = doc(collection(db, this.tableName));
              const recordWithId = { ...record, id: docRef.id };
              await setDoc(docRef, recordWithId);
              insertedItems.push(recordWithId);
            }
          } catch (err: any) {
            console.warn(`Firestore insert notice (${this.tableName}):`, err?.message || err);
            const fallbackId = record.id || `loc-${Date.now()}-${i}`;
            insertedItems.push({ ...record, id: fallbackId });
          }
        } else {
          const fallbackId = record.id || `gen-${Date.now()}-${i}`;
          const fallbackRecord = { ...record, id: fallbackId };
          insertedItems.push(fallbackRecord);
        }
      }

      // Always sync to local storage cache as backup
      const cur = await this.fetchTableDocs();
      const key =
        FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
        `wg_${this.tableName}`;
      setFallback(key, [...insertedItems, ...cur.filter((c) => !insertedItems.some((n) => n.id === c.id))]);

      return {
        data: Array.isArray(this.insertPayload) ? insertedItems : insertedItems[0],
        error: null,
      };
    }

    // 2. UPDATE
    if (this.action === 'update') {
      const payload = cleanFirestoreData({
        ...this.updatePayload,
        updated_at: this.updatePayload.updated_at || new Date().toISOString(),
      });

      if (isFirebaseConfigured) {
        try {
          if (this.tableName === 'settings') {
            await setDoc(doc(db, 'settings', '1'), payload, { merge: true });
            return { data: payload, count: 1, error: null };
          }

          const idFilter = this.filters.find((f) => f.column === 'id');
          if (idFilter) {
            await setDoc(doc(db, this.tableName, String(idFilter.value)), payload, { merge: true });
            return { data: payload, count: 1, error: null };
          }

          const allDocs = await this.fetchTableDocs();
          const matches = allDocs.filter((item) =>
            this.filters.every((f) => String(item[f.column]) === String(f.value))
          );
          for (const m of matches) {
            await setDoc(doc(db, this.tableName, String(m.id)), payload, { merge: true });
          }
          return { data: payload, count: matches.length, error: null };
        } catch (err: any) {
          console.error(`Update failed in ${this.tableName}:`, err);
          return { data: null, error: err };
        }
      } else {
        const allDocs = await this.fetchTableDocs();
        const key =
          FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
          `wg_${this.tableName}`;
        let updatedCount = 0;
        const updated = allDocs.map((item) => {
          const match = this.filters.every((f) => String(item[f.column]) === String(f.value));
          if (match) {
            updatedCount++;
            return { ...item, ...payload };
          }
          return item;
        });
        setFallback(key, updated);
        return { data: payload, count: updatedCount, error: null };
      }
    }

    // 3. DELETE
    if (this.action === 'delete') {
      if (isFirebaseConfigured) {
        try {
          const idFilter = this.filters.find((f) => f.column === 'id');
          if (idFilter) {
            await deleteDoc(doc(db, this.tableName, String(idFilter.value)));
            return { data: null, count: 1, error: null };
          }

          const allDocs = await this.fetchTableDocs();
          const matches = allDocs.filter((item) =>
            this.filters.every((f) => String(item[f.column]) === String(f.value))
          );
          for (const m of matches) {
            await deleteDoc(doc(db, this.tableName, String(m.id)));
          }
          return { data: null, count: matches.length, error: null };
        } catch (err: any) {
          console.error(`Delete failed in ${this.tableName}:`, err);
          return { data: null, error: err };
        }
      } else {
        const allDocs = await this.fetchTableDocs();
        const key =
          FALLBACK_KEYS[this.tableName.toUpperCase() as keyof typeof FALLBACK_KEYS] ||
          `wg_${this.tableName}`;
        const remaining = allDocs.filter(
          (item) => !this.filters.every((f) => String(item[f.column]) === String(f.value))
        );
        setFallback(key, remaining);
        return { data: null, count: allDocs.length - remaining.length, error: null };
      }
    }

    // 4. SELECT
    let items = await this.fetchTableDocs();

    for (const filter of this.filters) {
      items = items.filter((item) => {
        if (filter.value === undefined) return true;
        const val = item[filter.column];
        if (typeof filter.value === 'boolean') {
          return Boolean(val) === filter.value;
        }
        if (typeof filter.value === 'number' || typeof val === 'number') {
          return String(val) === String(filter.value);
        }
        return val === filter.value;
      });
    }

    const exactCount = items.length;

    if (this.orderColumn) {
      const col = this.orderColumn;
      const asc = this.orderAscending;
      items.sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return asc ? 1 : -1;
        if (valB === null || valB === undefined) return asc ? -1 : 1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return asc ? valA - valB : valB - valA;
        }
        return asc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    if (this.limitCount !== null && this.limitCount >= 0) {
      items = items.slice(0, this.limitCount);
    }

    if (this.isHeadOnly) {
      return { data: [], count: exactCount, error: null };
    }

    return {
      data: items,
      count: this.isCountQuery ? exactCount : undefined,
      error: null,
    };
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export const dbService = {
  auth: firebaseAuthClient,
  from(tableName: string) {
    return new FirestoreQueryBuilder(tableName);
  },
};

// Aliases for compatibility
export const dbClient = dbService;
export const supabase = dbService;
export default dbService;
