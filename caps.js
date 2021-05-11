'use strict';


const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
let deliverySystem = io.of('/caps') 
const event = require('./modules/Event')
require('dotenv').config();

deliverySystem.on('connection', socket => {


    socket.on('pickup', payload => {
        // emit to whatever you want here
        console.log("EVENT ", event('pickup', payload))
        deliverySystem.emit('pickup', payload);
    });

    socket.on('in-transit', payload => {
        console.log("EVENT ", event('in-transit', payload))
    })

    socket.on('delivered', payload => {
        console.log("EVENT ", event('delivered', payload))
        // track[`${payload.storeName}`].delivered.push(payload)
        deliverySystem.to('queue').emit('delivered', payload)
        deliverySystem.to(payload.storeName).emit('delivered', payload)
    })
})
