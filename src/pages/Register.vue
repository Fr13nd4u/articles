<template>
    <div class="register">
      <h1>Реєстрація</h1>
      <form @submit.prevent="">
        <div>
          <label for="Email">Email:</label>
          <input type="email" v-model="Email" id="Email" />
        </div>
        <div>
          <label for="UserName">Логін:</label>
          <input type="text" v-model="UserName" id="UserName" />
        </div>
        <div>
          <label for="Name">Ім'я:</label>
          <input type="text" v-model="Name" id="Name" />
        </div>
        <div>
          <label for="Surname">Призвіще:</label>
          <input type="text" v-model="Surname" id="Surname" />
        </div>
        <div>
          <label for="MiddleName">По батькові:</label>
          <input type="text" v-model="MiddleName" id="MiddleName" />
        </div>
        <div>
          <label for="Password">Пароль:</label>
          <input type="password" v-model="Password" id="Password" />
        </div>
        <div>
          <label for="ConfirmPassword">Підтвердіть пароль:</label>
          <input type="password" v-model="ConfirmPassword" id="ConfirmPassword" />
        </div>
        <button @click="formSubmit" type="submit">Зареєструватись</button>
      </form>
    <p v-if="showError" id="error">Ви неправильно ввели данні, попробуйте ще</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      Email: "",
      UserName: "",
      Name: "",
      Surname: "",
      MiddleName: "",
      Password: "",
      ConfirmPassword: "",
      showError: false
    }
  },
  methods: {
    async formSubmit() {
      await axios.post('https://localhost:44306/api/Account/Register', {
        Email: this.Email,
        UserName: this.UserName,
        Name: this.Name,
        Surname: this.Surname,
        MiddleName: this.MiddleName,
        Password: this.Password,
        ConfirmPassword: this.ConfirmPassword 
      })
      .then(() => {
        this.showError = false;
      })
      .then(() => {
        this.$router.push("Login")
      })
      .catch(() => {
        this.showError = true;
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
    margin-bottom: 30px;
  }
  .register {
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
  button[type="submit"] {
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