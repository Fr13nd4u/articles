<template>
    <div>
        <div class="navbar">
            <ul>
                <router-link tag="li" to="/">Home</router-link>
                <router-link tag="li" to="/posts">Posts</router-link>
                <router-link tag="li" to="/register">Register</router-link>
                <router-link tag="li" to="/login">Login</router-link>
            </ul>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
 
}
</script>

<style lang="scss">
    .navbar {
        background-color: #4caf50;
        margin-bottom: 50px;
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 50%;
        li{
            text-transform: uppercase;
            font-family: Roboto, sans-serif;
            font-size: 20px;
            color: #fff;
            padding: 15px 20px;
            cursor: pointer;
        }
    }
</style>
