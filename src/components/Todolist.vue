 <template>
  <div class='todo'>
    <div class='todo-header'>
      <input v-model='todoHeader' type=text placeholder='Add your todo' @keyup.enter="createTodo"/>
    </div>
    <h2>Not Completed</h2>
    <div v-for='todo in notCompletedTodo' :key='todo.id'>
      <div class='task'>
        <span class='todo-text'>{{ todo.header }}</span>
        <button @click='deleteTodo(todo.id)'>Delete</button>
        <button @click='completeTodo(todo.id)'>Complete</button>
      </div>
    </div>
    <h2>Completed</h2>
    <div v-for='todo in completedTodo' :key='todo.id'>
      <div class='completed-task'>
        {{ todo.header }}
        <button @click='deleteTodo(todo.id)'>Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// import Login from '@/components/Login.vue'
export default {
  name: 'TodoList',
  data: function () {
    return {
      todos: [],
      todoHeader: ''
    }
  },
  created: function () {
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
      // const username = sessionStorage.getItem('username')
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
}
</script>

<style>
  .todo-header{
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 30px 0;
  }
  .todo-header input{
    font-size: 16px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 5px;
    height: 40px;
  }

  .todo h2{
    text-align: left;
    /* margin-bottom: 60px; */
    color: rgba(0, 0, 0, 0.5);
  }

  .task{
    font-size: 16px;
    height:56px;
    line-height:30px;
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    padding: 12px;
    margin: 6px 0;
    overflow: hidden;
  }

  .task button{
    margin-left: 6px;
    float: right;
    padding: 7px;
    font-size: 16px;
    border: none;
    background-color: rgba(255, 255, 255, 0.6);
    color: rgba(0, 0, 0, 0.8);
    outline: none;
    cursor: pointer;
  }
  .completed-task{
    height:56px;
    line-height:30px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    padding: 12px;
    margin: 6px 0;
    overflow: hidden;
  }

  .completed-task button{
    float: right;
    padding: 7px;
    font-size: 16px;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    cursor: pointer;
  }
</style>
