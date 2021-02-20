import { displayTasks } from './views'
import { removeByIndex, findIndexByUUID, markDone } from './todos'

//Handlers and listeners for the delete and finish buttons

const deleteHandler = (task) => {
  let taskIndex = findIndexByUUID(task.uuid)
  removeByIndex(taskIndex)
  displayTasks()
}

const deleteListeners = () => {
  const deleteButtons = document.querySelectorAll('.delete')
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => { 
      event.preventDefault()
      const task = event.target.previousSibling
      deleteHandler(task)
    })
  })
}

const finishHandler = (task) => {
  let taskIndex = findIndexByUUID(task.uuid)
  markDone(taskIndex)
  displayTasks()
}

const finishListeners = () => {
  const finishButtons = document.querySelectorAll('.finish')
  finishButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const task = event.target.previousSibling.previousSibling
      finishHandler(task)
    })
  })
}

export { finishListeners, deleteListeners }