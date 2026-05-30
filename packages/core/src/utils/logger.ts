import { Logger } from '@models';

export const createLogger = (prefix: string, customLogger?: Logger): Logger => {
  const getTimestamp = () => new Date().toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const log = (level: 'info' | 'warn' | 'error' | 'debug', message: string, ...args: any[]) => {
    if (customLogger) {
      customLogger[level](`${prefix} ${message}`, ...args);
      return;
    }

    const style = {
      info: 'color: #00bcd4; font-weight: bold;',
      warn: 'color: #ff9800; font-weight: bold;',
      error: 'color: #f44336; font-weight: bold;',
      debug: 'color: #9c27b0; font-weight: bold;',
    }[level];

    console[level](
      `%c[ZETAGRID] %c${prefix} %c[${level.toUpperCase()}] %c[${getTimestamp()}] %c${message}`,
      style,
      'color: #2a2d35; font-weight: bold; background-color: #60d5e8; padding: 2px 4px; border-radius: 4px;',
      'color: #9e9e9e;',
      'color: #607d8b;',
      'color: inherit;',
      ...args,
    );
  };

  return {
    info: (msg, ...args) => log('info', msg, ...args),
    warn: (msg, ...args) => log('warn', msg, ...args),
    error: (msg, ...args) => log('error', msg, ...args),
    debug: (msg, ...args) => log('debug', msg, ...args),
  };
};
