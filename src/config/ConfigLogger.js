import log4js from 'log4js';

const ENV = process.env.NODE_ENV;
const LOG_LEVEL = ENV === 'prod' ? 'info' : 'trace';

class ConfigLogger {
  constructor(name) {
    if (!name) {
      throw new Error(
        'logger instantianted without providing a name',
      );
    }

    this.name = name;
    return this.getLoggerClient();
  }

  getAppender() {
    const appender = {};
    appender[this.name] = {
      type: 'file',
      filename: './logs/pwsinderbot.log',
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    };
    return appender;
  }

  getLoggerClient() {
    const appender = this.getAppender();
    log4js.configure({
      appenders: appender,
      categories: {
        default: { appenders: [this.name], level: LOG_LEVEL },
      },
      pm2: ENV === 'prod',
    });
    return log4js.getLogger(this.name);
  }
}

export default ConfigLogger;
