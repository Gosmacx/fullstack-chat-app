# fullstack-chat-app

🥳 A **real-time** full-stack chat app.

`Vue 3 Composition API` + `Tailwind` + `Express` + `Socket.io`

## Typing Module

```js
const messageText = ref(null)
const typing = ref(false)

watchEffect((onInavlidate) => {
    if (messageText.value) {
        typing.value = true // User Typing.
        const delay = setTimeout(() => typing.value = false, 1000); // User not typing.
        onInavlidate(() => clearTimeout(delay));
    } else {
        typing.value = false
    }
})

watch(typing, (newVal, oldVal) => {
        // Emit current status.
        socket.emit('typing', {
            id: store.state.id,
            username: store.state.username,
            typing: newVal
        })
})

```

## ScreenShots

### `Login Screen`

![Screenshot 1](https://raw.githubusercontent.com/Gosmacx/fullstack-chat-app/main/screenshots/ss.png)

### `Chat Screen`

![Screenshot 2](https://raw.githubusercontent.com/Gosmacx/fullstack-chat-app/main/screenshots/ss2.png)

### `Responsive Design` & `Multiple Typing.`

![Screenshot 3](https://raw.githubusercontent.com/Gosmacx/fullstack-chat-app/main/screenshots/typing.png)


