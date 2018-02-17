const winston = require('winston');
const morgan = require('morgan');
const chalk = require('chalk');

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    }),
  ],
});

logger.level = process.env.LOG_LEVEL || 'debug';


const colorify = num => (num < 200 ? chalk.magenta(num)
  : num < 300 ? chalk.green(num)
    : num < 400 ? chalk.blue(num)
      : num < 500 ? chalk.yellow(num)
        : chalk.red(num));

morgan.token('status', (req, res) => {
  const headersSent = (typeof res.headersSent !== 'boolean')
    ? Boolean(res._header)
    : res.headersSent;
  if (!headersSent) {
    return undefined;
  }
  return colorify(res.statusCode);
});


// custom morgan logging to fit in with winston
const appLogger = (morgan((tokens, req, res) => [
  (new Date()).toLocaleTimeString(),
  `- ${chalk.magenta('express')}:`,
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')));

/**
 * Log some strings
 * @param {string} level debug, info, silly
 * @param {string} mod module
 * @param {string} msg message
 */
const log = (level, mod, msg) => {
  logger.log(level, msg, {
    module: mod,
  });
};

module.exports = {
  log,
  morgan: appLogger,
};
