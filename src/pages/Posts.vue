<template>
    <div>
        <div class="container">

            <h1>Публікації</h1>
            <div v-if="loading" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <!-- <div v-for="item in posts" :key="item.id">
                <h4>{{item.Name}}</h4>
                <p>{{item.Text}}</p>
                <p>дата:{{item.Date.slice(0, -11)}} час:{{item.Date.slice(11,-5)}}</p>
                <hr>
            </div> -->
            
            <div v-for="item in posts" :key="item.id">
                <article class="blog-card">
                    <div class="blog-card__head">
                        <h4 class="user">ім'я користувача</h4>
                        <div class="time">
                            <p>дата: {{item.Date.slice(0, -11)}}</p>
                            <p>час: {{item.Date.slice(11,-5)}}</p>
                        </div>
                    </div>
                    <div class="blog-card__info">
                        <h5 class="title">{{item.Name}}</h5>
                        <p class="text">{{item.Text}}</p>
                        <ul v-for="keyItem in item.KeyWords" :key="keyItem.Id">
                            <li><a href="#">{{keyItem.Word}}</a></li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            posts: null,
            loading: true,
        }
    },
    async mounted() {
        await axios.get('Api/Publication/Get/', { 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
            } 
        })
        .then(res => (this.posts = res.data))
        .catch(() => {
            this.$router.push("Login")
        })
        .finally(() => {
            this.loading = false
        })
        //console.log(localStorage.getItem('userName'))
    }
}
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }
    h1 {
        margin: 100px 0 30px 0;
    }

    .blog-card {
        border: 1px solid rgb(235, 238, 240);
        box-sizing: border-box;
        padding: 20px;
        color: #000;
        margin-bottom: -1px;

        &__head {
            display: flex;
            justify-content: space-between;

            .user {
               font-size: 18px; 
            }

            .time {
                color: rgb(91, 112, 131);
                text-align: left;
            }
        }

        &__info{
            padding: 0 20px;

            .title {
                font-size: 16px;
                margin: 20px 0 10px;
            }
            .text {
                text-align: left;
                border-bottom: 1px solid rgb(235, 238, 240);
            }
        }
    }

    // Анімація загрузки

    .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }
    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #4caf50;
        margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
    }
    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
    }
    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
    }
    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
    }
    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
    }
    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
    }
    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
    }
    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
    }
    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>