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
      <p v-if="showError" id="error">Ви неправильно ввели данні, попробуйте ще раз</p>
    </div>
</template>

<script>
export default {
  data() {
      return {
        userName: "",
        Password: "",
        showError: false
      }
  },
  methods: {
    async logIn() {
      const axios = require('axios')

      const params = new URLSearchParams()
      params.append( 'userName', this.userName)
      params.append( 'Password', this.Password)
      params.append('grant_type', 'password')

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      await axios.post('token', params, config)
      .then(res => {
        localStorage.setItem('access_token' , res.data.access_token);
        localStorage.setItem('userName' , res.data.userName);
        this.showError = false;
        this.$router.push("Posts")
      })
      .catch(() => {
        this.showError = true;
      })
      
      // axios.post('https://diplommustafaiev.azurewebsites.net/token', {
      //   userName: this.userName,
      //   Password: this.Password,
      //   grant_type: 'password'
      // },{ 
      //     headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   } 
      // })
      // .then(response => {
      //   console.log(response)
      // })
      // .then(() => {
      //   this.$router.push("Posts")
      // })
      // .catch(error => {
      //   if (error.response) {
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      //   } else if (error.request) {
      //     console.log(error.request);
      //   } else {
      //     console.log('Error', error.message);
      //   }
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