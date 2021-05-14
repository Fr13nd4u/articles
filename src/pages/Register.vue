<template>
    <div class="register">
     <div>
      <form >
        <div>
          <label for="email">Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label for="Surname">Surname:</label>
          <input type="text" name="Surname" />
        </div>
        <div>
          <label for="middle_name">Middle name:</label>
          <input type="text" name="middle_name" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label for="confirm_password">Confirm password:</label>
          <input type="password" name="confirm_password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.register {
    width: 40%;
    margin: 0 auto;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
form div {
    display: flex;
    justify-content: space-between;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 20px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

</style>