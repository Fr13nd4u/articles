<template>
    <div class="login">
        <h1>Вхід</h1>
        <form @submit.prevent="logIn">
        <div>
          <label for="userName">Логін:</label>
          <input type="text" v-model="userName" id="userName" />
        </div>
        <div>
          <label for="Password">Пароль:</label>
          <input type="password" v-model="Password" id="Password" />
        </div>
        <button type="submit" >Вхід</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
      return {
        userName: "",
        Password: "",
        // grant_type: "password"
      }
  },
  methods: {
    async logIn() {
      // const headers = { 
      //   'Content-Type': 'form-data'
      // };

      await axios.post('https://localhost:44306/token', {
        userName: this.userName,
        Password: this.Password,
        grant_type: "password"
      })
      .then(resp => {
        console.log(resp)
      })
      .then(() => {
        this.$router.push("Posts")
      })
      // .catch(err => {
      //     console.log(err)
      // })
    }
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
  .login {
    width: 400px;
    margin: 0 auto;
  }
  label {
    padding: 15px 12px 12px 0;
    margin-left: auto;
  }
  form div {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-weight: 700;
  }
  button {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 30px;
    margin-top: 20px;
    font-size: 18px;

    &:hover {
      background-color: #45a049;
    }
  }
  input {
    margin: 5px;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 10px;

    &:focus {
      outline: none;
    }
  }
  #error {
    color: rgb(230, 1, 1);
    margin-top: 30px;
    font-weight: 600;
  }
</style>