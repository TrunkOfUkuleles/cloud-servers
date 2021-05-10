'use strict';

const io = require('socket.io')(3000);
let deliverySystem = io.of('/caps')
const { del } = require('httpie');
const event = require('./modules/Event')

deliverySystem.on('connection', socket => {

    socket.on('join', room => {
        console.log('room name:', room);

        socket.join(room);
        deliverySystem.to('queue').emit('joined', room)
        
      })

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
