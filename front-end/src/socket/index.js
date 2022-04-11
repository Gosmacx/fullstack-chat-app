import { io } from'socket.io-client'
import router from '../router';
import store from '../store';
const socket = io("http://localhost:5000")

socket.on("joined", users => {
    store.commit("setUsers", users.users)
    router.push("/chat")
})

socket.on("userJoined", user => {
    store.commit("addUser", user)
})

socket.on("messageClient", msg => {
    store.commit("addMessage", msg)
})

socket.on("disconnectedUser", user => {
    store.commit("removeUser", user)
})

export default socket;