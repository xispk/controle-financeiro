import logger from 'pino';
import dayjs from 'dayjs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const level = serverRuntimeConfig['log_level'];

export const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
