// const { addUser, removeUser, getUser, getUsersInRoom } = require("./models/playerModel");

// module.exports = io => {
//     io.on('connection', socket => {
//       socket.on('join', (payload, callback) => {
//         const { error, newUser } = addUser({
//           id: socket.id,
//           name: payload.name,
//           room: payload.room,
//         });
  
//         if (error) return callback(error);
  
//         socket.join(newUser.room);
  
//         io.to(newUser.room).emit('roomData', {
//           room: newUser.room,
//           users: getUsersInRoom(newUser.room),
//         });
  
//         socket.emit('currentUserData', { name: newUser.name });
//         callback();
//         return undefined;
//       });
  
//       socket.on('initGameState', gameState => {
//         const user = getUser(socket.id);
//         if (user) io.to(user.room).emit('initGameState', gameState);
//       });
  
//       socket.on('updateGameState', gameState => {
//         const user = getUser(socket.id);
//         if (user) io.to(user.room).emit('updateGameState', gameState);
//       });
  
//       socket.on('sendMessage', (payload, callback) => {
//         const user = getUser(socket.id);
//         io.to(user.room).emit('message', { user: user.name, text: payload.message });
//         callback();
//       });
    
//       socket.on('disconnect', () => {
//         const user = removeUser(socket.id);
//         if (user)
//           io.to(user.room).emit('roomData', {
//             room: user.room,
//             users: getUsersInRoom(user.room),
//           });
//         });
//       });
//   }