<template>
    <div>
        <div class="navbar">
            <div class="container">
                <div class="navbar-menu">
                    <ul>
                        <router-link tag="li" to="/">Головна</router-link>
                        <router-link tag="li" to="/posts">Публікації</router-link>
                        <router-link tag="li" to="/register">Реєстрація</router-link>
                        <router-link tag="li" to="/login">Вхід</router-link>
                    </ul>
                    <p>Вітаю{{isUser}}</p>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
    data() {
        return {
            isUser: ''
        }
    },
    created() {
        // if (localStorage.getItem('access_token')) {
        //     this.isUser = localStorage.getItem('userName');
        // }
        localStorage.getItem('access_token') 
        ? this.isUser = `, ${localStorage.getItem('userName') }`
        : this.isUser = ''
    }
}
</script>

<style lang="scss">
    .container {
        max-width: 1170px;
        margin: auto;
    }

    .navbar {
        background-color: #4caf50;
        overflow: hidden;
        position: fixed; 
        top: 0; 
        width: 100%; 

        &-menu {
            display: flex;
            justify-content: space-between;

            p {
                font-size: 16px;
                color: #fff;
                padding: 15px 20px;
            }
        }
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 400px;
        li{
            text-transform: uppercase;
            font-family: Roboto, sans-serif;
            font-size: 18px;
            color: #fff;
            padding: 15px 20px;
            cursor: pointer;
        }
    }
</style>
