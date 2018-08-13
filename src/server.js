const io = require('socket.io')();

io.on('connection', (socket) => {
  socket.on('subscribe', (roomObj) => {
    console.log('joining', roomObj.room);
    socket.join(roomObj.room);
  });

  socket.on('unsubscribe', (roomObj) => {
    console.log('leaving', roomObj.room);
    socket.leave(roomObj.room);
  });

  socket.on('message', (messageObj) => {
    console.log(messageObj);
    socket.broadcast.to(messageObj.room).emit('public message', messageObj)
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port', port);