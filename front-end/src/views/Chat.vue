<template>
    <section class="h-screen lg:space-x-10 space-x-0 lg:space-y-0 space-y-5 w-full flex lg:flex-row flex-col items-center justify-center">

        <Users/>

        <chat-box/>



    </section>
</template>

<script setup>
import Users from '../components/Users.vue'
import ChatBox from '../components/ChatBox.vue'
</script>