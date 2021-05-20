<template>
    <div>
        <h1>Публікації</h1>
        <div v-for="item in posts" :key="item.id">
            <p>{{item.Text}}</p>
            <p>{{item.Date}}</p>
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            posts: null
        }
    },
    mounted() {
        axios
        .get('https://localhost:44306/api/Publication/Get/')
        .then(res => (this.posts = res.data))
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  h1 {
    margin-bottom: 30px;
  }
</style>