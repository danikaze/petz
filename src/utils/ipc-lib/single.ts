import { AppMessage, isMessage } from './private';

export type SingleMessageListener<
  TDM extends AnyObject,
  T extends string & keyof TDM = string & keyof TDM
> = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: TDM[T]) => void
) => Promise<void>;

type ChromeListener = Parameters<
  typeof chrome['runtime']['onMessage']['addListener']
>[0];

/**
 * Create wrappers for typed single messages between
 * parts of a chrome extension (i.e. different pages or background-client)
 *
 * TDM: Type-Data Mapping
 */
export class SingleMessageIpc<TDM extends AnyObject> {
  private listenersMap = new Map();

  /**
   * Promisified typed wrapper for `chrome.runtime.sendMessage`
   */
  public async sendMessage<
    R extends string & keyof TDM = string & keyof TDM,
    T extends string & keyof TDM = string & keyof TDM
  >(type: T, data?: TDM[T]) {
    // hack to avoid the following V3 bug:
    // https://stackoverflow.com/questions/71520198/
    const err1 = new Error('Callstack before sendMessage:');
    return new Promise<TDM[R]>((resolve, reject) => {
      chrome.runtime.sendMessage<AppMessage<TDM, T>, TDM[R]>(
        { type, data },
        (response) => {
          let err2: typeof chrome.runtime.lastError | Error =
            chrome.runtime.lastError;
          if (
            !err2 ||
            err2.message?.startsWith('The message port closed before')
          ) {
            resolve(response);
          } else {
            err2 = new Error(err2.message);
            (err2 as Error).stack += err1.stack!.replace(/^Error:\s*/, '');
            reject(err2);
          }
        }
      );
    });
  }

  /**
   * Typed wrapper for `chrome.runtime.addListener`
   */
  public addListener<T extends string & keyof TDM>(
    type: T | T[],
    listener: SingleMessageListener<TDM, T>
  ): void {
    const types = Array.isArray(type) ? type : [type];
    const cb: ChromeListener = async (msg: any, sender, sendResponse) => {
      if (!isMessage(msg, types)) return;
      let replied = false;
      const reply = (data?: TDM[T]) => {
        replied = true;
        sendResponse(data);
      };
      await listener(msg.data as TDM[T], sender, reply);
      if (!replied) {
        sendResponse();
      }
      chrome.runtime.lastError;
      return true;
    };

    this.listenersMap.set(listener, cb);
    chrome.runtime.onMessage.addListener(cb);
  }

  /**
   * Typed wrapper for `chrome.runtime.removeListener`
   */
  public removeListener(listener: SingleMessageListener<TDM>): void {
    const cb = this.listenersMap.get(listener);
    if (!cb) return;

    this.listenersMap.delete(listener);
    chrome.runtime.onMessage.removeListener(cb);
  }
}
