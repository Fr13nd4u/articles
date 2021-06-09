<template>
  <div class="container">
    <div class="home">
      <h1>Головна</h1>
      <form @submit.prevent="">
        <div>
          <label for="PublicationName">Назва:</label>
          <input type="text" v-model="publication.Name" id="PublicationName" />
        </div>
        <div>
          <label for="PublicationAnnotation">Анотація:</label>
          <textarea v-model="publication.Annotation" id="PublicationAnnotation" />
        </div>
        <div>
          <label for="PublicationText">Текст:</label>
          <textarea class="area-txt" v-model="publication.Text" id="PublicationText" />
        </div>

        <div class="row-input">
          <div class="row-input_blok">
            <label>Конференція:</label>
            <select v-model="publication.ConferenceId">
              <option v-bind:value="conference.Id" v-for="conference in conferences" :key="conference.Id">{{conference.Name}}</option>
            </select>
          </div>
          <div class="row-input_blok">
            <label>Журнал:</label>
            <select v-model="publication.JournalId">
              <option v-bind:value="journal.Id" v-for="journal in journals" :key="journal.Id">{{journal.Name}}</option>
            </select>
          </div>
          <div class="row-input_blok">
            <label>Видавництво:</label>
            <select v-model="publication.PublisherId">
              <option v-bind:value="publisher.Id" v-for="publisher in publishers" :key="publisher.Id">{{publisher.Name}}</option>
            </select>
          </div>
        </div>

        <div class="row-input">
          <div class="row-input_blok">
            <label for="SqopusLink">Посилання на Sqopus:</label>
            <input type="url" v-model="publication.SqopusLink" id="SqopusLink" />
          </div>
          <div class="row-input_blok">
            <label for="WebOfScienceLink">Посилання на WebOfScience:</label>
            <input type="url" v-model="publication.WebOfScienceLink" id="WebOfScienceLink" />
          </div>
          <div class="row-input_blok">
            <label for="NumberOfPages">Кількість сторінок:</label>
            <input type="number" v-model="publication.NumberOfPages" id="NumberOfPages" />
          </div>
          <div class="row-input_blok">
            <label for="Language">Мова:</label>
            <input type="text" v-model="publication.Language" id="Language" />
          </div>
        </div>

        <div @submit.prevent="">
          <form class="keywords">
            <label for="KeyWords">Ключові слова:</label>
            <input type="text" v-model="keyWord.Word" id="KeyWords" />
            <button class="add" type="submit" @click="addKeyWord">додати</button>
            <button class="rem" type="submit" @click="delKeyWord">видалити</button>
            <ul>
              <li v-for="item in publication.KeyWords" :key="item.id">#{{item.Word}}</li>
            </ul>
          </form>
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
      publication: {
        Name: "",
        Annotation: "",
        Text: "",
        ConferenceId: "",
        SqopusLink: "",
        WebOfScienceLink: "",
        JournalId: "",
        NumberOfPages: "",
        Language: "",
        UserId: "",
        PublicationTypeId: 1,
        KeyWords: []
      },
      journals: [],
      conferences: [],
      publishers: [],
      keyWord: {
        Word: ""
      },
      showError: false
    }
  },
  methods: {
    async formSubmit() {
      await axios.post('Api/Publication/Post', {
        publication: this.publication,
        addauthors: []
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
    },

    addKeyWord: function(word) {
      word = this.keyWord.Word;
      this.publication.KeyWords.push({Word: word, Language: "English"});
      this.keyWord.Word = '';
    },

    delKeyWord: function() {
      this.publication.KeyWords.pop()
    }
  },
  async mounted() {
    await axios.get('Api/Journal/Get', { 
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
        } 
    })
    .then(res => this.journals = res.data)
    await axios.get('Api/Conference/Get', { 
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
        } 
    })
    .then(res => this.conferences = res.data)
    await axios.get('Api/Publisher/Get', { 
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
        } 
    })
    .then(res => this.publishers = res.data)
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
   ul {
      list-style: none;
      margin: 0;
      li {
        display: inline; /* Отображать как строчный элемент */
        margin-right: 10px;
        color: rgb(57, 4, 182);
        cursor: pointer;

        &:hover {
            color: darken(rgb(57, 4, 182), 15%);
        }
      }
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
  input, textarea, select {
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

  .keywords {
    button {
      margin-left: 7px;
      box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
      background: #fff;
      padding: 7px;
      border-radius: 10px;
      &:hover {
        background: #fff;
      }
    }
    .add {
      color: #45a049; 
    }
    .rem {
      color: rgb(251, 36, 36); 
    }
  }

  #KeyWords {
    width: 72%;
  }

  #error {
    color: rgb(230, 1, 1);
    margin: 30px 0;
    font-weight: 600;
  }
</style>