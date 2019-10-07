<template>
  <div class="login-form">
    <h1>Login</h1>
    <div class="login">
      <input v-model='username' type=text placeholder='Username'/>
    </div>
    <div class="login">
      <input v-model='password' type=password placeholder='Password'/>
    </div>
    <button class='btn' @click='login'>Sign in</button>
    <div class='go-signup'>
      Don't have account? <a href="/#/register">Sign up</a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
      sessionStorage.setItem('username', this.username)
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
  .login-form{
    width: 360px;
    background: rgba(255, 255, 255, 0.5);
    height: 500px;
    padding: 60px 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login-form h1 {
    text-align: center;
    margin-bottom: 60px;
    color: rgba(0, 0, 0, 0.5);
  }

  .login{
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 30px 0;
  }

  .login input{
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

  .go-signup{
    margin-top: 50px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 16px;
  }
</style>>
