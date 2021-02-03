import todos from './todos.js'
import { displayTasks, saveTodos } from './methods.js'
//uuidv4() is imported in index.html
  //creates new uuid

let userTodos = JSON.parse(localStorage.getItem('userTodos'))

if(!userTodos || userTodos.length === 0){
  userTodos = [...todos]
}

displayTasks(userTodos)

//Logic for filtering through todos
  //I add a second array and push matching items to this array
  //Then I run my display function with the filtered array

const filter = document.querySelector('#filter')

filter.addEventListener('input', event => {
  const filterBy = event.target.value.toLowerCase()

  const filteredTodos = []

  userTodos.forEach(todo => {
    if(todo.task.toLowerCase().includes(filterBy)){
      filteredTodos.push(todo)
    }
  })

  displayTasks(filteredTodos, userTodos)
})

const form = document.querySelector('#new-todo')

form.addEventListener('submit', event => {
  event.preventDefault()
  const newTask = event.target.elements.newTask
  if(newTask.value) {
    userTodos.push({
      task: newTask.value,
      completed: false,
      uuid: uuidv4()
    })
    displayTasks(userTodos)
    newTask.value = ''
  }
})
