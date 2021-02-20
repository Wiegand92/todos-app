import { setFilters } from './filters.js'
import { addTodo } from './todos.js'
import { displayTasks } from './views.js'

displayTasks()

//Logic for filtering through todos
  //I add a second array and push matching items to this array
  //Then I run my display function with the filtered array

const filter = document.querySelector('#filter')

filter.addEventListener('input', event => {
  const filterBy = event.target.value.toLowerCase()
  if(filterBy){
    setFilters({ text: filterBy })
  } else {
    setFilters({ text: ''})
  }
  displayTasks()
})

const hideCompleted = document.querySelector('#hideCompleted')

hideCompleted.addEventListener('change', (e) => {
  console.log(e)
  setFilters({ hideCompleted: e.target.checked})
  displayTasks()
})

const form = document.querySelector('#new-todo')

form.addEventListener('submit', event => {
  event.preventDefault()
  const newTask = event.target.elements.newTask

  if(newTask.value) {
    addTodo(newTask.value)
    displayTasks()
    newTask.value = ''
  }
})
