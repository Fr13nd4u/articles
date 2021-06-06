<template>
  <div class="container">
    <div class="home">
    <h1>Головна</h1>
    <form @submit.prevent="">
      <div>
        <label for="PublicationName">Назва:</label>
        <input type="text" v-model="PublicationName" id="PublicationName" />
      </div>
      <div>
        <label for="PublicationAnnotation">Анотація:</label>
        <textarea v-model="PublicationAnnotation" id="PublicationAnnotation" />
      </div>
      <div>
        <label for="PublicationText">Текст:</label>
        <textarea class="area-txt" v-model="PublicationText" id="PublicationText" />
      </div>

      <div class="row-input">
        <div class="row-input_blok">
          <label for="ConferenceName">ConferenceName:</label>
          <input type="text" v-model="ConferenceName" id="ConferenceName" />
        </div>
        <div class="row-input_blok">
          <label for="SqopusLink">SqopusLink:</label>
          <input type="url" v-model="SqopusLink" id="SqopusLink" />
        </div>
        <div class="row-input_blok">
          <label for="WebOfScienceLink">WebOfScienceLink:</label>
          <input type="url" v-model="WebOfScienceLink" id="WebOfScienceLink" />
        </div>
      </div>

      <div class="row-input">
        <div class="row-input_blok">
          <label for="Journal">Journal:</label>
          <input type="number" v-model="Journal" id="Journal" />
        </div>
        <div class="row-input_blok">
          <label for="NumberOfPages">NumberOfPages:</label>
          <input type="number" v-model="NumberOfPages" id="NumberOfPages" />
        </div>
        <div class="row-input_blok">
          <label for="Language">Language:</label>
          <input type="text" v-model="Language" id="Language" />
        </div>
      </div>
      
      <button @click="formSubmit" type="submit">Створити</button>
    </form>
    <p v-if="showError" id="error">Ви неправильно ввели данні, попробуйте ще</p>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      PublicationName: "",
      PublicationAnnotation: "",
      PublicationText: "",
      ConferenceName: "",
      SqopusLink: "",
      WebOfScienceLink: "",
      Journal: "",
      NumberOfPages: "",
      Language: "",
      showError: false
    }
  },
  methods: {
    async formSubmit() {
      await axios.post('Api/Publication/Post', {
        PublicationName: this.PublicationName,
        PublicationAnnotation: this.PublicationAnnotation,
        PublicationText: this.PublicationText,
        ConferenceName: this.ConferenceName,
        SqopusLink: this.SqopusLink,
        WebOfScienceLink: this.WebOfScienceLink,
        Journal: this.Journal,
        NumberOfPages: this.NumberOfPages,
        Language: this.Language
      },
      { headers: {
        "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
      }
      })
      .then(() => {
        this.showError = false;
        this.$router.push("Posts")
      })
      .catch((err) => {
        this.showError = true;
        console.log(err);
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
  .home {
    width: 100%;
    margin: 0 auto;
  }
  label {
    padding: 15px 12px 12px 0;
  }
  form div {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }
  .row-input {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    flex-direction: row;

    &_blok {
      display: flex;
      width: 50%;
    }
  }
  button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 30px;
    margin: 30px 0;
    font-size: 18px;

    &:hover {
      background-color: #45a049;
    }
  }
  input, textarea {
    margin: 5px auto;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 10px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
  textarea {
    height: 300px;
    width: 100%;
  }

  .area-txt {
    height: 450px;
  }
  #error {
    color: rgb(230, 1, 1);
    margin-top: 30px;
    font-weight: 600;
  }
</style>