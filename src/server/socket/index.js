const io = require('socket.io');
const { logger } = require('../logger');

const sockets = [];

const emitAll = (type, payload) => {
  sockets.map(sck => sck.emit(type, payload));
};

const conn = sck => {
  logger('debug', 'src/server/socket', `${sck.id} connected`);

  // update the list of websocket clients
  sockets.push(sck);
  logger('debug', 'src/server/socket', `${sockets.length} total sockets connected`);

  // respond to pings
  sck.on('keepalive', () => logger('debug', 'src/server/socket', `${sck.id} pinged`));

  sck.on('disconnect', () => {
    const index = sockets.indexOf(sck);
    if (index !== -1) sockets.splice(index, 1);
    logger('debug', 'src/server/socket', `${sck.id} disconnected.`);
    logger('debug', 'src/server/socket', `${sockets.length} sockets remain`);
  });
};

exports.bind = server => {
  // initialise the server
  const sock = io(server);
  // add event listeners
  sock.on('connection', conn);
};
