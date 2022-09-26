let currentWindow: chrome.windows.Window['id'] | 'popup';

export async function setCurrentUniqueWindow(
  win: typeof currentWindow
): Promise<void> {
  if (currentWindow && currentWindow !== 'popup') {
    try {
      await chrome.windows.remove(currentWindow);
    } catch (e) {}
  }
  currentWindow = win;
}
