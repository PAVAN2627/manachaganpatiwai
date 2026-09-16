// Pure Firebase Bridge (Deprecated Supabase Shim for zero-breakage backward compatibility)
import dbService from '@/lib/db';
export { dbService as supabase, dbService, dbClient, FirestoreQueryBuilder } from '@/lib/db';
export default dbService;
