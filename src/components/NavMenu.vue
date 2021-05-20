<template>
    <div>
        <div class="navbar">
            <div class="container">
                <ul>
                <router-link tag="li" to="/">Головна</router-link>
                <router-link tag="li" to="/posts">Публікації</router-link>
                <router-link tag="li" to="/register">Реєстрація</router-link>
                <router-link tag="li" to="/login">Вхід</router-link>
                </ul>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
 
}
</script>

<style lang="scss">
    .container {
        max-width: 1170px;
        margin: auto;
    }

    .navbar {
        background-color: #4caf50;
        margin-bottom: 50px;
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 400px;
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
