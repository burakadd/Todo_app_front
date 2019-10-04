 <template>
  <div class='todo'>
    <input v-model='todoHeader' type=text placeholder='Add your todo' @keyup.enter="createTodo"/>
    <h2>Not Completed</h2>
    <div>Here{{ creatorr }}</div>
    <div v-for='todo in notCompletedTodo' :key='todo.id'>
      <div>
        {{ todo.header }}
        <button @click='deleteTodo(todo.id)'>Delete</button>
        <button @click='completeTodo(todo.id)'>Complete</button>
      </div>
    </div>
    <h2>Completed</h2>
    <div v-for='todo in completedTodo' :key='todo.id'>
      <div>
        {{ todo.header }}
        <button @click='deleteTodo(todo.id)'>Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// import Login from '@/components/Login.vue'
import {eventBus} from '@/eventBus'
export default {
  name: 'TodoList',
  data: function () {
    return {
      todos: [],
      todoHeader: '',
      creatorr: ''
    }
  },
  created: function () {
    eventBus.$on('myuser', (creator) => {
      this.creatorr = creator
    })
    $.ajaxSetup({
      headers: {'Authorization': 'Token ' + sessionStorage.getItem('token')}
    })
    this.getTodoList()
  },
  computed: {
    notCompletedTodo: function () {
      return this.todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completedTodo: function () {
      return this.todos.filter(function (todo) {
        return todo.completed
      })
    }
  },
  methods: {
    getTodoList: function () {
      $.ajax({
        url: 'http://127.0.0.1:8000/todo/',
        type: 'GET',
        success: response => {
          this.todos = response
        },
        error: response => {
          if (response.status === 400) {
            alert('Wrong login or password')
          }
        }

      })
    },
    createTodo () {
      $.ajax({
        url: 'http://127.0.0.1:8000/todo/',
        type: 'POST',
        data: {
          creator: this.creatorr,
          header: this.todoHeader
        },
        success: (response) => {
          this.getTodoList()
          this.todoHeader = ''
        },
        error: (response) => {
          alert(response.statusText)
        }
      })
    },
    deleteTodo (id) {
      $.ajax({
        url: 'http://127.0.0.1:8000/todo/' + id + '/',
        type: 'DELETE',
        success: (response) => {
          this.getTodoList()
        },
        error: (response) => {
          alert(response.statusText)
        }
      })
    },
    completeTodo (id) {
      $.ajax({
        url: 'http://127.0.0.1:8000/todo/' + id + '/',
        type: 'PATCH',
        data: {
          completed: 'True'
        },
        success: (response) => {
          this.getTodoList()
        },
        error: (response) => {
          alert(response.statusText)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
