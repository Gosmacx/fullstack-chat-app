import { createStore } from 'vuex'

export default createStore({
    state: {
        username: null,
        id: null,
        users: [],
        messages: []
    },
    getters: {
        getUsers(state){
            return state.users
        },
        getMessages(state){
            return state.messages
        }
    },
    mutations: {
        addUser(state, user){
            state.users.push(user)
        },
        setUsers(state, users){
            state.users = users
        },
        setSelf(state, user){
            state.username = user.username
            state.id = user.id
        },
        removeUser(state, user){
            state.users = state.users.filter(u => u.id !== user.id)
        },
        addMessage(state, message){
            state.messages.push(message)
        }
    }
}) 