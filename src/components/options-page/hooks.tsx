import { useEffect } from 'react';
import { useSettings } from '@components/settings';
import { saveSettings } from '@utils/settings';
import { SettingsData } from '@utils/settings/types';

export function useOptionsPage() {
  const settings = useSettings();
  const refs = {};

  useEffect(() => {
    if (!settings) return;
    populateOptionsFromSettings(settings);
  }, [settings === undefined]);

  function populateOptionsFromSettings(settings: SettingsData): void {}

  function createSettingsObject(): SettingsData {
    return {
      version: PACKAGE_VERSION,
    };
  }

  async function saveOptions() {
    const settings = createSettingsObject();
    await saveSettings(settings);
  }

  return {
    refs,
    settings,
    saveOptions,
  };
}
