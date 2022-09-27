import { FunctionComponent, useEffect } from 'react';
import { singleIpc } from '@utils/ipc';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';
import { useSettings } from '@components/settings';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  const settings = useSettings();

  useEffect(() => {
    const isPopup = !location.hash.includes('external');
    if (!isPopup) return;
    singleIpc.sendMessage('registerPopup');
  }, []);

  async function openNewWindow() {
    await singleIpc.sendMessage('openExternalWindow');
    window.close();
  }

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HelloWorld saluteWho={saluteWho} />
      <button onClick={openNewWindow}>Open in a new window</button>
    </>
  );
};
