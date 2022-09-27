import { FC, ReactNode } from 'react';
import { SettingsProvider, useSettingsHooks } from './hooks';
export { useSettings } from './hooks';

export interface Props {
  children?: ReactNode;
}

export const Settings: FC<Props> = ({ children }) => {
  const { settings } = useSettingsHooks();

  return <SettingsProvider value={settings}>{children}</SettingsProvider>;
};
