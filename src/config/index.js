import log4js from 'log4js';
import getEnv from '../utils/getEnv';

const ENV = getEnv();
const LOG_LEVEL = ENV === 'prod' ? 'info' : 'trace';
const LOG_FILENAME = `./logs/pwsinderbot.log`;

log4js.configure({
  appenders: {
    default: {
      type: 'file',
      filename: LOG_FILENAME,
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ['default'], level: LOG_LEVEL },
  },
  pm2: ENV === 'prod',
});

const logger = log4js.getLogger();

export { logger };
