// const users = {};

// const addUser = ({ id, name, room }) => {
//     const numberOfUsersInRoom = Object.values(users).filter(user => user.room === room).length;

//     if (numberOfUsersInRoom === 2) {
//         return { error: 'Room full' };
//     }

//     const newUser = { id, name, room };
//     users[id] = newUser;
//     return { newUser };
// };

// const removeUser = id => {
//     const user = users[id];
//     if (!user) return null;

//     delete users[id];
//     return user;
// };

// const getUser = id => users[id];

// const getUsersInRoom = room => Object.values(users).filter(user => user.room === room);

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };
