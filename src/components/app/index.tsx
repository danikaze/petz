import { FunctionComponent, useEffect, useState } from 'react';
import { singleIpc } from '@utils/ipc';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';
import { useSettings } from '@components/settings';
import { Game } from '@components/game';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  const settings = useSettings();
  const [renderGame, setRenderGame] = useState<boolean>(false);

  useEffect(() => {
    const isPopup = !location.hash.includes('external');
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
    <>
      {!renderGame && <HelloWorld saluteWho={saluteWho} />}
      <button onClick={openNewWindow}>Open in a new window</button>
      {!renderGame && <button onClick={createGame}>Create game</button>}
      {renderGame && <Game />}
    </>
  );
};
