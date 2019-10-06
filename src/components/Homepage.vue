 <template>
  <div class='homepage'>
    <div>
        <button v-if='!isAuthorized' @click='goLogin'>Login</button>
        <button v-else @click='logout'>Logout</button>
        <Todolist v-if='isAuthorized'></Todolist>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import Todolist from '@/components/Todolist'
export default {
  name: 'Homepage',
  components: {
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
      sessionStorage.removeItem('username')
      this.$router.replace({name: 'Login'})
    }
  }
}
</script>

<style scoped>
</style>
