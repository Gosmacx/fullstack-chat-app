<template>
        <div class="lg:h-[700px] lg:w-[700px] h-[80%] w-[95%] relative rounded shadow-lg flex justify-between flex-col shadow-gray-800 bg-gray-300" >
             
             <div class="flex flex-col grow h-full p-3 w-full overflow-y-auto items-start justify-start" >
                 <div v-for="msg in $store.getters.getMessages" :key="msg" :class="{ selfMessage: msg.id == $store.state.id}" class="flex animateMsg transition-all bg-gray-400 rounded-lg p-2 text-black items-center justify-center mb-2" >
                     <strong class="mr-1" v-if="msg.id !== $store.state.id" >{{ msg.username }}:</strong>
                     <span> {{ msg.message }} </span>
                 </div>
             </div>

             <div class="h-12 w-full relative bg-gray-800 flex items-center text-white" >
                <div class="absolute text-gray-700 -top-6 left-2" >
                    <span v-if="typingUsers.length == 1 && typingUsers.length !== 0" > {{ typingUsers[0].username }} </span>
                    <span v-else v-for="(user, index) in typingUsers" :key="(user, index)" > {{ user.username }}{{ index == typingUsers.length  - 1 ? '' : ', ' }}  </span>
                    <span v-if="typingUsers.length > 0 " > Yazıyor... </span>
                </div>
                <input v-model="messageText" maxlength="250" @keyup.enter="sendMessage" class="w-[600px] bg-black px-2 h-full bg-transparent outline-none" placeholder="Bir mesaj fırlat!" type="text">
                <button @click="sendMessage" class="p-2 mx-auto text-sm bg-blue-600 rounded-xl" >Gönder</button>
             </div>
             
        </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import socket from '../socket/index.js'
const messageText = ref(null)
const typing = ref(false)
const typingUsers = ref([])
const store = useStore()


watchEffect((onInavlidate) => {

    if (messageText.value) {
        typing.value = true
        const delay = setTimeout(() => typing.value = false, 4000);
        onInavlidate(() => clearTimeout(delay));
    } else {
        typing.value = false
    }


})

watch(typing, (newVal, oldVal) => {
    if (newVal) {
        socket.emit('typing', {
            id: store.state.id,
            username: store.state.username,
            typing: true
        })
    } else {
        socket.emit('typing', {
            id: store.state.id,
            username: store.state.username,
            typing: false
        })
    }
})

socket.on("typingUser", data => {
    if (data.typing) {
        typingUsers.value.push(data)
    } else {
        typingUsers.value = typingUsers.value.filter(user => user.id !== data.id)
    }
})

const sendMessage = () => {
    if (!messageText.value) return alert("Lütfen bir mesaj yazınız.")
    socket.emit("message", {
        message: messageText.value,
        id: socket.id,
        username: store.state.username
    })
    messageText.value = null
}

</script>

<style>

.selfMessage{
    align-self: flex-end;
}

.animateMsg{
    animation: animation 0.5s;
}

@keyframes animation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
}

</style>