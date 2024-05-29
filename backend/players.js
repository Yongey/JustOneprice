const users = []

const addUser = ({id, name, room}) => {
   const numberOfUsersInRoom = users.filter(user => user.room === room).length
   if(numberOfUsersInRoom === 2)
   return { error: 'Room full' }

   const newUser = { id, name, room }
   users.push(newUser)
   return { newUser }
}

const removeUser = id => {
   const removeIndex = users.findIndex(user => user.id === id)

   if(removeIndex!==-1)
       return users.splice(removeIndex, 1)[0]

    return undefined;
}

const getUser = id => users.find(user => user.id === id)

const getUsersInRoom = room => users.filter(user => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }