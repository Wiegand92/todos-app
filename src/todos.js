import uuidv4 from 'uuid'
import { getFilters } from './filters'

//Original todos array with instructions
const startingTodos = [
  {
    task: 'Tasks here are incomplete',
    completed: false,
    uuid: uuidv4()
  },
  {
    task: 'Click on the X to delete, or the checkmark to complete',
    completed: false,
    uuid: uuidv4()
  },
  {
    task: 'Tasks here are complete',
    completed: true,
    uuid: uuidv4()
  },
  {
    task: "Click on the X to delete them when you're done",
    completed: true,
    uuid: uuidv4()
  }
]

//Pull userTodos from localStorage, or set it to empty array
let userTodos = JSON.parse(localStorage.getItem('userTodos')) || []


const saveTodos = () => {
  const userTodosJSON = JSON.stringify(userTodos)
  localStorage.setItem('userTodos', userTodosJSON)
}

const getTodos = () => {
  if(userTodos.length === 0) {
    return filterTodos(startingTodos)
  } else {
    return filterTodos(userTodos)
  }
}

const addTodo = (todo) => {
  console.log(todo)
  if(todo.length > 0){
    userTodos.push({
      task: todo,
      completed: false,
      uuid: uuidv4()
    })
    saveTodos()
  }
}

//Helper functions to DRY code

const findIndexByUUID = (UUID) => {
  if(userTodos.length > 0){
    return userTodos.findIndex(todo => {
      return todo.uuid === UUID
    })
  } else {
    return startingTodos.findIndex(todo => todo.uuid === UUID)
  }
}

const removeByIndex = (index) => {
  if(userTodos.length > 0){
    userTodos.splice(index, 1)
    saveTodos()
  } else {
    startingTodos.splice(index, 1)
  }
}

const markDone = (index) => {
  if(userTodos.length > 0){
    userTodos[index].completed = true
    saveTodos()
  } else {
    startingTodos[index].completed = true
  }
}

const filterTodos = (todos) => {
  const { text } = getFilters()
  if(text){
    let filteredTodos = []
    todos.forEach(todo => {
      if(todo.task.toLowerCase().includes(text)){
        filteredTodos.push(todo)
      }
    })
    return filteredTodos
  } else {
    return todos
  }
}

export { getTodos, addTodo, removeByIndex, markDone, findIndexByUUID }