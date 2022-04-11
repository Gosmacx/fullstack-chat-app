# fullstack-chat-app

🥳 A **real-time** full-stack chat app.

`Vue 3 Composition API` + `Tailwind` + `Express` + `Socket.io`

## Typing Module

![Screen Shot 3](https://gcdnb.pbrd.co/images/V9FVaoWIh6E3.png?o=1)

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

![Screen Shot 1](https://gcdnb.pbrd.co/images/bMdxR30uaN8Q.png?o=1)

### `Chat Screen`

![Screen Shot 2](https://gcdnb.pbrd.co/images/RQLLDmtIk169.png?o=1)

### `Responsive Design`

![Screen Shot 3](https://gcdnb.pbrd.co/images/kQKCl7H6aREo.png?o=1)
