  
'use strict';

const io = require('socket.io-client');

// const server = 'http://localhost:3000';
const server = 'http://cloudy-env.eba-tsgs9ci3.us-east-2.elasticbeanstalk.com/';

const socket = io.connect(server);

socket.on('welcome', payload => console.log(payload));

socket.emit('hello', 'Julien');