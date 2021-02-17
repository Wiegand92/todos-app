import todos from './todos.js'
import { displayTasks } from './methods.js'
import uuidv4 from 'uuid'

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
  const isSame = () => {
    for(let i=0; i<todos.length; i++) {
      return todos[i].task === userTodos[i].task
    }
  }
  if(isSame() && newTask.value) {
    userTodos = []
  }
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
