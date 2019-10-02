<template>
  <div>
      <input v-model="username" type=text placeholder="Username"/>
      <input v-model="password" type=password placeholder="Password"/>
      <button @click="login">Login</button>
      <br>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      $.ajax({
        url: 'http://127.0.0.1:8000/token/',
        type: 'POST',
        data: {
          username: this.username,
          password: this.password
        },
        success: response => {
          alert('You were logged in')
          sessionStorage.setItem('token', response.token)
          this.$router.replace({path: '/helloworld/'})
        },
        error: response => {
          if (response.status === 400) {
            alert('Wrong login or password')
          }
        }

      })
    }
  }
}
</script>

<style scoped>

</style>>
