import React, { FunctionComponent, useEffect } from 'react';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';
import { singleIpc } from '@src/utils/ipc';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  useEffect(() => {
    const isPopup = !location.hash.includes('external');
    if (!isPopup) return;
    singleIpc.sendMessage('registerPopup');
  }, []);

  async function openNewWindow() {
    await singleIpc.sendMessage('openExternalWindow');
    window.close();
  }

  return (
    <>
      <HelloWorld saluteWho={saluteWho} />
      <button onClick={openNewWindow}>Open in a new window</button>
    </>
  );
};
