<template>
  <div class="register-form" autocomplete="off">
      <h1>Registration</h1>
      <div class="register" autocomplete="off">
        <input v-model="username" type=text placeholder="Username"/>
      </div>
      <div class="register" autocomplete="off">
        <input v-model="password" type=password placeholder="Password"/>
      </div>
      <div class="register" autocomplete="off">
        <input v-model="password2" type=password placeholder="Confirm password"/>
      </div>
      <button class='btn' @click="register">Sign up</button>
      <div class='go-login'>
        Already a user? <a href="/#/">Sign in</a>
      </div>
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
      } else {
        alert('Password was not confirmed')
      }
    },
    loginWhenRegistered: function () {
      sessionStorage.setItem('username', this.username)
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
.register-form{
    width: 360px;
    background: rgba(255, 255, 255, 0.5);
    height: 500px;
    padding: 60px 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .register-form h1 {
    text-align: center;
    margin-bottom: 60px;
    color: rgba(0, 0, 0, 0.5);
  }

  .register{
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 30px 0;
  }

  .register input{
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 5px;
    height: 40px;
  }

  .btn{
    font-size: 16px;
    display: block;
    width: 100%;
    height: 50px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    cursor: pointer;
    transition: .5s;
  }

  .go-login{
    margin-top: 30px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 16px;
  }
</style>>
