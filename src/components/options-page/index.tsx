import { FC } from 'react';
import { useOptionsPage } from './hooks';

import styles from './options-page.module.scss';

export const OptionsPage: FC = () => {
  const { settings, refs, saveOptions } = useOptionsPage();

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <h1>Options page</h1>
        <h5>{settings.version}</h5>
      </div>
      <div>
        <button onClick={saveOptions}>Save</button>
      </div>
    </>
  );
};
