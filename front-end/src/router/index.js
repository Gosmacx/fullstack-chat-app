import { createRouter, createWebHistory } from 'vue-router'

import home from '../views/Home.vue'
import store from '../store/'

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/chat',
        component: () => import('../views/Chat.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.username) {
                next('/')
            } else {
                next()
            }
        }
    }
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})