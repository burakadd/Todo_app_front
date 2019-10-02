<template>
 <div class='todo'>
    <input id='addTodo' v-model='todoHeader' type=text placeholder='Add yor todo'/>
    <button @click='createTodo'>Add</button>
    <h2>Not Completed</h2>
    <div v-for='todo in notcompletedTodo' :key='todo.id'>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      todos: [],
      todoHeader: '',
      todoId: ''
    }
  },
  created () {
    this.getTodoList()
  },
  computed: {
    notcompletedTodo: function () {
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
//   created() {
//     $.ajaxSetup({
//       headers: {'Authorization': sessionStorage.getItem('token')},
//     })
//   },
}
</script>

<style scoped>
</style>
