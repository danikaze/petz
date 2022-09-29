import clsx from 'clsx';
import { FunctionComponent, useEffect, useState } from 'react';
import { singleIpc } from '@utils/ipc';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';
import { useSettings } from '@components/settings';
import { Game } from '@components/game';

import styles from './app.module.scss';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  const settings = useSettings();
  const [renderGame, setRenderGame] = useState<boolean>(false);
  const isPopup = !location.hash.includes('external');
  const divClasses = clsx(
    styles.root,
    isPopup ? styles.popup : styles.external
  );

  useEffect(() => {
    if (!isPopup) return;
    singleIpc.sendMessage('registerPopup');
  }, []);

  async function openNewWindow() {
    await singleIpc.sendMessage('openExternalWindow');
    window.close();
  }

  function createGame() {
    setRenderGame(true);
  }

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div className={divClasses}>
      {!renderGame && <HelloWorld saluteWho={saluteWho} />}
      {isPopup && <button onClick={openNewWindow}>Open in a new window</button>}
      {!renderGame && <button onClick={createGame}>Create game</button>}
      {renderGame && <Game />}
    </div>
  );
};
