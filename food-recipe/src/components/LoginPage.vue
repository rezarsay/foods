<template>
  <div class="login">
    <h2>login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">username</label>
        <input type="text" v-model="username" id="username" required>
      </div>
      <div>
        <label for="password">password</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
      password: '',
      error: ''
      };
    },
    methods: {
      async login() {
        if (this.username === 'admin' && this.password === 'admin') {
          this.$router.push('/home');
          localStorage.setItem('token', '123sd123');
        } else {
          this.error = 'Invalid credentials';
        }
      }
    }
  };
  </script>
  
  <style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

form div {
  margin-bottom: 1em;
}

label {
  margin-bottom: .5em;
  color: #333333;
  display: block;
}

input {
  border: 1px solid #ccc;
  padding: .5em;
  font-size: 1em;
  border-radius: 4px;
  width: calc(100% - 1em);
}

button {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: red;
}
</style>