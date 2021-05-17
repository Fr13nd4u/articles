import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Posts from '../pages/Posts'
import Register from '../pages/Register'
import Login from '../pages/Login'

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: "Home",
            component: Home
        },
        {
            path: '/posts',
            name: "Posts",
            component: Posts
        },
        {
            path: '/register',
            name: "Register",
            component: Register
        },
        {
            path: '/login',
            name: "Login",
            component: Login
        }
    ],
    mode: 'history'
})