const express = require("express");
const path = require("path");
const compression = require('compression')();
const logger = require('morgan')('dev');
const helmet = require('helmet')();

/**
 * app vars
 */
const app = express();
const pub = path.join(__dirname, 'public');
const index = path.join(pub, 'index.html');

/**
 * express middleware
 */
app.use('/public', express.static(pub));
app.use(compression);
app.use(logger);
app.use(helmet);


// used for react - enables client-side routing
app.get('*', (req, res) => res.sendFile(index));

// export for bin/www
module.exports = app;