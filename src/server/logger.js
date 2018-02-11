const winston = require('winston');

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

/**
 * Log some strings
 * @param {string} level debug, info, silly
 * @param {string} mod module
 * @param {string} msg message
 */
module.exports = (level, mod, msg) => {
  logger.log(level, msg, {
    module: mod,
  });
};
