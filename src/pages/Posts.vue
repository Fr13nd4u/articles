<template>
    <div>
        <div class="container">
            <h1>Публікації</h1>
            <input type="text" v-model="search" placeholder="Пошук" />
            <div v-if="loading" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        

            <div v-for="item in filterdPosts" :key="item.id">
                <article class="blog-card">

                    <button class="show-modal" id="show-modal" @click="showModal = true">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="35px" height="20px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
                            <g id="unfold-more">
                                <path d="M229.5,71.4l81.6,81.6l35.7-35.7L229.5,0L112.2,117.3l35.7,35.7L229.5,71.4z M229.5,387.6L147.9,306l-35.7,35.7L229.5,459
                                    l117.3-117.3L311.1,306L229.5,387.6z"/>
                            </g>
                        </svg>
                    </button>
                    <transition name="fade" appear>
                        <div 
                            class="modal-ovarlay" 
                            v-if="showModal" 
                            @click="showModal = false">
                            
                        </div>
                    </transition>
                    <transition name="slide" appear>
                        <div class="modal" v-if="showModal" >
                            <h2>Додаткова інформація</h2>
                            <p>Журнал: {{item.Publication.Journal.Name}}</p>
                            <p>Мова: {{item.Publication.Language}}</p>
                            <p>Посилання на статю web of science: <a href="#">{{item.Publication.WebOfScienceLink}}</a></p>
                            <p>Посилання на статю sqopus: <a href="#">{{item.Publication.SqopusLink}}</a></p>
                            <p>Конференція: {{item.Publication.Conference.Name}}</p>
                            <p>Кількість сторінок: {{item.Publication.NumberOfPages}}</p>
                            <button class="hide-modal" @click="showModal = false">Закрити</button>
                        </div>
                    </transition>

                    <div class="blog-card__head">
                        <h4 class="user">{{`${item.User.Name} ${item.User.MiddleName} ${item.User.Surname}`}}</h4>
                        <div class="time">
                            <p>час: {{item.Publication.Date.slice(11,-5)}}</p>
                            <p>дата: {{item.Publication.Date.slice(0, -11)}}</p>
                        </div>
                    </div>
                    <div class="blog-card__info">
                        <h5 class="title">Annotation</h5>
                        <p >{{item.Publication.Annotation}}</p>
                        <br>
                        <h5 class="title">{{item.Publication.Name}}</h5>
                        <p class="text">{{item.Publication.Text}}</p>
                        <ul class="nav-keyword">
                            <li
                                v-for="keyItem in item.Publication.KeyWords" 
                                :key="keyItem.Id"
                            >#{{keyItem.Word}}</li>
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
            posts: [],
            loading: true,
            showModal: false,
            search: ''
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
    },
    computed: {
        filterdPosts: function(){
            return this.posts.filter(item => {
                return item.Publication.Name.match(this.search) 
                    || item.Publication.Text.match(this.search)
                    || item.Publication.Annotation.match(this.search)
                    || item.User.Name.match(this.search)
                    || item.User.MiddleName.match(this.search)
                    || item.User.Surname.match(this.search);
            }) 
        }
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
    .container {
        max-width: 1170px;
        margin: auto;
    }

    input {
        margin-bottom: 30px;
        box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
        padding: 10px;
        border-radius: 10px;
        width: 50%;

        &:focus {
        outline: none;
        }
    }

    .blog-card {
        position: relative;
        border: 1px solid rgb(235, 238, 240);
        box-sizing: border-box;
        padding: 20px;
        color: #000;
        margin-bottom: 30px;

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
            }
        }
    }

    .nav-keyword {
        display: flex;
        list-style: none;
        li {
            color: rgb(57, 4, 182);
            margin: 10px 5px;
            cursor: pointer;

            &:hover {
                color: darken(rgb(57, 4, 182), 15%);
            }
        }
    }

    // модальне вікно

    .show-modal {
        position: absolute;
        top: -15px;
        right: -15px;
        border-radius: 50%;
        border: 1px solid #ccc;
        padding: 5px 0;
        cursor: pointer;
    }
    .modal-ovarlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        padding: 20px;

        width: 100%;
        max-width: 800px;  
        background-color: #fff; 

        p {
            text-align-last: left;
            margin: 10px 0;
        }
    }

    .hide-modal {
        cursor: pointer;
        padding: 10px;
        color: #777;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 4px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    // Анімація загрузки

    .lds-roller {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;   
        transform: translate(-50%, -50%);
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

    // скрити/показати текст

    .limited {
        max-height: 400px;
        overflow: hidden;
        position: relative;
    }
     
    .limited.l-300 {
        max-height: 300px;
    }
    .limited .bottom {
        position: absolute;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1) 80%);
        width: 100%;
        height: 60px;
        opacity: 1;
        transition: .3s;
    }
    .show-text {
        opacity: 0;
        position: absolute;
    }
    .show-text:checked ~ .limited {
        max-height: none;
    }
    .show-text:checked ~ .limited .bottom {
        opacity: 0;
        transition: .3s;
    }
    .show-text ~ .show-text-btn:before {
        content: 'Показати »';
    }
    .show-text:checked ~ .show-text-btn:before {
        content: 'Скрити «';
    }
    .show-text-btn {
        cursor: pointer;
        display: inline-block;
        padding: 10px;
        color: #777;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>