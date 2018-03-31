'use strict';
const socketIoEmitter = require('socket.io-emitter');
const redisClient = require('src/resources/redis');
const io = socketIoEmitter(redisClient);

module.exports = io;
