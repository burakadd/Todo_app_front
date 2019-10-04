import Vue from 'vue'
import Login from '@/components/Login'
import Todolist from '@/components/Todolist'

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#eventBus',
  components: {
    Login,
    Todolist
  }
})
