 <template>
  <div class='homepage'>
    <div>
        <h1>Your todolist for today</h1>
        <button v-if='!isAuthorized' @click='goLogin'>Login</button>
        <button v-else @click='logout'>Logout</button>
        <Todolist v-if='isAuthorized'></Todolist>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Todolist from '@/components/Todolist'
export default {
  name: 'Homepage',
  components: {
    Login,
    Register,
    Todolist
  },
  data: function () {
    return {
    }
  },
  computed: {
    isAuthorized: function () {
      if (sessionStorage.getItem('token')) {
        return true
      }
    }
  },
  methods: {
    goLogin: function () {
      this.$router.replace({name: 'Login'})
    },
    logout: function () {
      sessionStorage.removeItem('token')
      window.location = '/login/'
    }
  }
}
</script>

<style scoped>
</style>
