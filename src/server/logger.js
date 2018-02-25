const winston = require('winston');
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


const colorify = num => {
  if (num < 200) return chalk.magenta(num);
  if (num < 300) return chalk.green(num);
  if (num < 400) return chalk.blue(num);
  if (num < 500) return chalk.yellow(num);
  return chalk.red(num);
};

const getResponseTime = (req, res) => {
  if (!req._startAt || !res._startAt) return '-';
  const begin = req._startAt;
  const end = res._startAt;
  const diff =
    ((end[0] - begin[0]) * 1e3) +
    ((end[1] - begin[1]) * 1e6);
  return `${diff.toFixed(3)}ms`;
};

const expressLogger = (req, res, next) => {
  const time = (new Date()).toLocaleTimeString();
  const prefix = chalk.magenta('express');
  const { originalUrl, method } = req;
  const status = colorify(res.statusCode);
  const responseTime = getResponseTime(req, res);
  console.log(`${time} - ${prefix}: ${method} ${originalUrl} ${status} ${responseTime}`);
  next();
};

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
  logger: log,
  expressLogger,
};
