import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Posts from '../pages/Posts'
import Register from '../pages/Register'
import Login from '../pages/Login'

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/posts',
            component: Posts
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        }
    ],
    mode: 'history'
})