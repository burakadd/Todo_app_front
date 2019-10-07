 <template>
  <div class='homepage'>
    <div>
        <button class='btn-logout' @click='logout'>Log out</button>
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

<style>
    .homepage{
    max-width: 600px;
    margin: auto;
    padding: 10px;
  }

  .btn-logout{
    /* float: right; */
    margin-left: 6px;
    padding: 5px;
    font-size: 16px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    cursor: pointer;
  }
</style>
