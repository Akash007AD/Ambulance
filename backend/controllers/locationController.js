const { Server } = require('socket.io');

const io = new Server(4000);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updateLocation', (data) => {
        socket.broadcast.emit('locationUpdated', data); // Broadcast new location to others
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
