<template>
  <div>
      <input v-model='username' type=text placeholder='Username'/>
      <input v-model='password' type=password placeholder='Password'/>
      <button @click='login'>Login</button>
       <div>
          Don't have account? <button @click='goSignUp'>Sign up</button>
        </div>
      <br>

  </div>
</template>

<script>
import $ from 'jquery'
import {eventBus} from '../eventBus'
export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goSignUp: function () {
      this.$router.replace({name: 'Register'})
    },
    login: function () {
      eventBus.$emit('myuser', '12345')
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
          this.$router.replace({name: 'Homepage'})
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
