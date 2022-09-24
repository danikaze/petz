/* eslint-disable no-console */
type LoggerMsgType = 'info' | 'warn' | 'error';

const cachedLoggers: Map<string, Logger> = new Map();

export function getLogger(namespace: string) {
  let logger = cachedLoggers.get(namespace);
  if (!logger) {
    logger = new Logger(namespace);
    cachedLoggers.set(namespace, logger);
  }
  return logger;
}

class Logger {
  private static colorMap: { [type: string]: string } = {
    info: '#000ca2',
    error: '#ca0000',
    warn: '#ffb818',
    table: '#999',
  };
  private static prefixStyle = (type: LoggerMsgType | 'table') =>
    `font-weight: bold; background: ${Logger.colorMap[type]}; color: #fff; padding: 0 5px; border-top-left-radius: 7px; border-bottom-left-radius: 7px`;
  private static dateStyle = `font-weight: bold; background: #666; color: #fff; padding: 0 5px; border-top-right-radius: 7px; border-bottom-right-radius: 7px`;

  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public info = this.logMsg.bind(this, 'info');
  public warn = this.logMsg.bind(this, 'warn');
  public error = this.logMsg.bind(this, 'error');

  public table<T extends AnyObject>(data: T, title?: string): void {
    console.log(
      `%c${this.namespace}%c${Logger.getDate()}`,
      Logger.prefixStyle('table'),
      Logger.dateStyle,
      title || '▼'
    );
    console.table(data);
  }

  private static getDate(): string {
    const d = new Date();

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    const zzz = String(d.getMilliseconds()).padStart(3, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${zzz}`;
  }

  private logMsg(type: LoggerMsgType, ...data: unknown[]): void {
    console.log(
      `%c${this.namespace}%c${Logger.getDate()}`,
      Logger.prefixStyle(type),
      Logger.dateStyle,
      ...data
    );
  }
}
