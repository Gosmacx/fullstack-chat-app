<template>
    <section class="h-screen w-full flex-col flex items-center space-y-5 justify-center" >
        <input @keyup.enter="joinRoom" v-model="username" class="h-12 w-96 text-gray-900 text-lg rounded outline-none px-2" placeholder="Kullanıcı Adı" type="text">
        <button @click="joinRoom" class="flex items-center justify-center w-96 h-10 border-2 border-yellow-500 hover:bg-yellow-500 transition-all text-yellow-500 hover:text-current " >Giriş Yap</button>
    </section>
</template>

<script setup>
import socket from '../socket/index.js'
import { ref } from 'vue'
import { useStore } from 'vuex';

const username = ref(null)

const store = useStore()

const joinRoom = () => {
    if (!username.value) return alert("Lütfen bir kullanıcı adı giriniz.")

    store.commit("setSelf", { 
        username: username.value, 
        id: socket.id 
    })

    socket.emit('join', {
        username: username.value,
        id: socket.id
    })

}


</script>