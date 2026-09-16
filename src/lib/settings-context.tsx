import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dbService as db } from '@/lib/db';
import { DEFAULT_SETTINGS, type Settings } from '@/lib/types';

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const { data } = await db
      .from('settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (data) setSettings(data as Settings);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
