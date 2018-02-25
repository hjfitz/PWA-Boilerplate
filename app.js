/**
 * required for express
 */
const express = require('express');
const path = require('path');
const compression = require('compression')();
const forceSSL = require('express-force-ssl');
const helmet = require('helmet')();
const netjet = require('netjet');
const bodyParser = require('body-parser');

/**
 * express routers
 */
const api = require('./src/server/routes');
const { logger, expressLogger } = require('./src/server/logger');

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');
const offline = path.join(pub, 'offline.html');
const worker = path.join(pub, 'javascripts', 'worker.js');

/**
 * If we're enforcing an SSL server
 * make sure to reroute HTTP requests to that server
 */
if (process.env.ENABLE_HTTPS === 'true' || process.env.ENABLE_HTTP2 === 'true') {
  logger('debug', 'app.js', 'forcing SSL');
  app.set('forceSSLOptions', {
    trustXFPHeader: true,
    sslRequireMessage: 'SSL Required',
  });
  app.use(forceSSL);
}

/**
 * express middleware
 */
app.use(helmet);
app.use(compression);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

/**
 * if HTTP2 is set, append preload headers
 */
if (process.env.ENABLE_HTTP2 === 'true') {
  app.use(netjet());
}

app.use('/public', express.static(pub));


/**
 * middleware for service worker
 * Needed to use /worker to enable the worker to use the
 * entire project dir for cache (if necessary)
 */
app.get('/worker.js', (req, res) => res.sendFile(worker));
app.get('/offline.html', (req, res) => res.sendFile(offline));

app.use(expressLogger);

/**
 * This middle must be the last one set up
 * used for react - enables client-side routing
 */
app.get('*', (req, res) => res.sendFile(index));

logger('debug', 'app.js', 'express initialised');

// export for bin/www
module.exports = app;
