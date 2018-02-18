/**
 * required for express
 */
const express = require('express');
const path = require('path');
const compression = require('compression')();
const forceSSL = require('express-force-ssl');
const helmet = require('helmet')();
const bodyParser = require('body-parser');

/**
 * express routers
 */
const api = require('./src/server/routes');
const { log, morgan } = require('./src/server/logger');

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');
const offline = path.join(pub, 'offline.html');
const worker = path.join(pub, 'javascripts', 'worker.js');


/**
 * express middleware
 */
app.use(helmet);
app.use(compression);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(pub));
app.use('/api', api);

/**
 * If we're enforcing an SSL server
 * make sure to reroute HTTP requests to that server
 */
if (process.env.ENABLE_HTTPS === 'true') {
  log('debug', 'app.js', 'forcing SSL');
  app.set('forceSSLOptions', {
    trustXFPHeader: true,
    sslRequireMessage: 'SSL Required',
  });
  app.use(forceSSL);
}

/**
 * middleware for service worker
 * Needed to use /worker to enable the worker to use the
 * entire project dir for cache (if necessary)
 */
app.get('/worker.js', (req, res) => res.sendFile(worker));
app.get('/offline.html', (req, res) => res.sendFile(offline));

app.use(morgan);

/**
 * This middle must be the last one set up
 * used for react - enables client-side routing
 */
app.get('*', (req, res) => res.sendFile(index));

log('debug', 'app.js', 'express initialised');

// export for bin/www
module.exports = app;
