import { singleIpc } from '@src/utils/ipc';
import { setCurrentUniqueWindow } from '@src/utils/set-current-unique-window';

let currentWindow: chrome.windows.Window['id'] | 'popup';

export function setupIpcListeners() {
  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === currentWindow) {
      setCurrentUniqueWindow(undefined);
    }
  });

  singleIpc.addListener('registerPopup', async () => {
    setCurrentUniqueWindow('popup');
  });

  singleIpc.addListener('openExternalWindow', async () => {
    const win = await chrome.windows.create({
      url: chrome.runtime.getURL('static/index.html#external'),
      width: 400,
      height: 600,
      focused: true,
      type: 'popup',
    });
    setCurrentUniqueWindow(win.id);
  });
}
