import type { SettingsData } from '@utils/settings/types';

export type AppMessages = {
  registerPopup: void;
  openExternalWindow: void;
  settingsUpdated: { settings: SettingsData };
};
