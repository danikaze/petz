import { createContext, useContext, useEffect, useState } from 'react';
import { SettingsData } from '@utils/settings/types';
import { singleIpc } from '@utils/ipc';
import { AppMessages } from '@utils/ipc/msgs';
import { loadSettings } from '@utils/settings';

const SettingsContext = createContext<SettingsData | undefined>(undefined);

export const SettingsProvider = SettingsContext.Provider;

export function useSettings(): SettingsData | undefined {
  return useContext(SettingsContext);
}

export function useSettingsHooks() {
  const [settings, setSettings] = useState<SettingsData | undefined>();

  useEffect(() => {
    loadSettings().then(setSettings);

    const listener = async (data: AppMessages['settingsUpdated']) => {
      setSettings(data.settings);
    };

    singleIpc.addListener('settingsUpdated', listener);

    return () => {
      singleIpc.removeListener(listener);
    };
  }, []);

  return { settings };
}
