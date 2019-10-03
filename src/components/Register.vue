<template>
  <div>
      <input v-model="username" type=text placeholder="Username"/>
      <input v-model="password" type=password placeholder="Password"/>
      <input v-model="password2" type=password placeholder="Password2"/>
      <button @click="register">Registration</button>
      <br>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Register',
  data: function () {
    return {
      username: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    register: function () {
      if (this.password === this.password2) {
        $.ajax({
          url: 'http://127.0.0.1:8000/register/',
          type: 'POST',
          data: {
            username: this.username,
            password: this.password
          },
          success: response => {
            alert('You were registered')
            this.loginWhenRegistered()
          },
          error: response => {
            if (response.status === 400) {
              alert('Error')
            }
          }

        })
      }
    },
    loginWhenRegistered: function () {
      $.ajax({
        url: 'http://127.0.0.1:8000/token/',
        type: 'POST',
        data: {
          username: this.username,
          password: this.password
        },
        success: response => {
          sessionStorage.setItem('token', response.token)
          this.$router.replace({name: 'Homepage'})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>>
