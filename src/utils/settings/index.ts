import { singleIpc } from '@utils/ipc';
import { getLogger } from '@utils/logger';
import { defaultSettings } from './default';
import type { SettingsData } from './types';

const logger = getLogger('settings');

export async function saveSettings(settings: SettingsData): Promise<void> {
  await chrome.storage.sync.set({ settings });
  logger.info('Settings stored', settings);
  singleIpc.sendMessage('settingsUpdated', { settings });
}

export async function loadSettings(): Promise<SettingsData> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: SettingsData;
  };

  if (!settings) {
    logger.info('No settings found, using default ones', defaultSettings);
    return defaultSettings;
  }

  logger.info('Settings loaded', settings);
  return await upgradeSettings(settings);
}

async function upgradeSettings(settings: SettingsData): Promise<SettingsData> {
  if (settings.version === PACKAGE_VERSION) {
    return settings;
  }

  // store updated settings
  settings.version = PACKAGE_VERSION;
  await saveSettings(settings);

  return settings;
}
