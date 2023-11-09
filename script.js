var STORAGE_KEY = 'todos-vuejs'//名稱
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}	

new Vue({
  el: "#app",
  data: {
    timeMessage: "",
    currentDay: null,
    currentDate: null,
    currentWeek: null,
    newTodo: '',
    todos: [],
    cacheTodo: {},
    cacheTodoTitle: '',
    visibility: 'all',
    day: moment().format("DD"),
    year: moment().format("YYYY"),
    month: moment().format("MMM"),
    currentWeek: moment().format("ddd"),
    timeMessage: moment().format('LTS')
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todos-vuejs')) {
        this.todos = JSON.parse(localStorage.getItem('todos-vuejs'));
      }
    },
    addTodo: function(e) {
      // validation check
      if (this.newTodo) {
        this.todos.unshift({
          id: this.todos.length,
          title: this.newTodo,
          completed: false,
        });
      }
      // reset newTodo
      this.newTodo = '';
      // save the new item in localstorage
      return true;
    },
    removeTodo: function(todo) {
      /**
        var newIndex = '';
        var vm = this;
        vm.todos.forEach(function(item, key){
            if (todo.id == item.id){
                newIndex = key;
            }
        })
      **/
        var vm = this;
        //findIndex 是個比較簡單找到 index 的方式，會把回傳為 true 的 index 位置，存到前方(newIndex)的變數之中
        var newIndex = vm.todos.findIndex(function(item, key){
            return todo.id === item.id;
        })
        this.todos.splice(newIndex,1);
    },
    editTodo: function(item) {
        console.log(item);
        this.cacheTodo = item;
        this.cacheTodoTitle = item.title;
    },
    cancelEdit: function() {
        this.cacheTodo = {} //取消則代入空值 == 沒有改變
    },
    doneEdit: function(item) {
        item.title = this.cacheTodoTitle; //item 的 title 為預存的 title
        this.cacheTodoTitle = ''; //把預存的 title 清空
        this.cacheTodo = {}; //把預存的內容也清空
    },
    deleteTodos: function() {
       this.todos = [];
    },
    updateCurrentTime() {
      this.timeMessage = moment().format('LTS');
    }
  },
  computed: {
    filteredTodos: function() {
      if(this.visibility == 'all') {
        return this.todos;
      } else if (this.visibility == 'doing') {
        var newTodo = [];
        this.todos.forEach(function(item){
          if(!item.completed) {
            newTodo.push(item);
          }
        })
        return newTodo;
      } else if (this.visibility == 'completed') {
        var newTodo = [];
        this.todos.forEach(function(item){
          if(item.completed) {
            newTodo.push(item);
          }
        })
        return newTodo;
      }
    },
    remaining: function() {
      return this.todos.filter(function(item){
        return !item.completed;
      });
    }
  },
  mounted() {
    this.getTodos();
  },
  watch: {
    todos: {
      handler: function(updatedList) {
        localStorage.setItem('todos-vuejs', JSON.stringify(updatedList));
      },
      deep: true
    }
  },
  created() {
    this.timeMessage = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
});

function getTasks(){
 // let todoLists = localStorage.getItem('todoLists') || '[]';
}