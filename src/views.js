import { finishListeners, deleteListeners } from './methods.js'
import { getTodos } from './todos'
import { getFilters } from './filters'

const displayTasks = () => {
  const { hideCompleted } = getFilters()
  const todosArray = getTodos()

  const completeSection = document.querySelector('#complete')
  const incompleteSection = document.querySelector('#incomplete')

  const completeBox = document.querySelector('#completed-todos-box')
  const incompleteBox = document.querySelector("#incomplete-todos-box")

  //Clear the section to avoid repeats

  completeSection.innerHTML = ''
  incompleteSection.innerHTML = ''

  //Check for hideCompleted filter
  if(hideCompleted){
    incompleteBox.style.minWidth = '90%' 
    document.getElementById('completed-todos-box').style.display = 'none' 
  } else {
    incompleteBox.style.minWidth = '45%'
    completeBox.style.display = 'flex'
  }

  //Place an item for each todo in the todos array

  todosArray.forEach(todo => {

    //Create a row for Flex purposes, and the task

    const taskSection = document.createElement('section')
    taskSection.className = 'task-row'
    const task = document.createElement('p')
    task.className = 'task'
    task.innerHTML = todo.task
    task.uuid = todo.uuid

    //All tasks have a delete button, so placed out here.

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete'
    deleteButton.innerHTML = 'X'

    
    taskSection.appendChild(task)
    taskSection.appendChild(deleteButton)

    //If there is a finished task place it in completed section

    if(todo.completed){
      task.id = 'completed'
      completeSection.appendChild(taskSection)
    } else {

    //Otherwise place it in unfinished with a finish button

      const finishButton = document.createElement('button')
      finishButton.className = 'finish'
      finishButton.innerHTML = '&#10003'
      task.id = 'incompleted'
      taskSection.appendChild(finishButton)
      incompleteSection.appendChild(taskSection)
    }    
  })

  //Make sure the boxes are the same height
  if(completeBox.offsetHeight < incompleteBox.offsetHeight) {
    completeBox.style.minHeight = `${incompleteBox.offsetHeight}px`
  }

  if(incompleteBox.offsetHeight < completeBox.offsetHeight) {
    incompleteBox.style.minHeight = `${completeBox.offsetHeight}px`
  }

  deleteListeners()
  finishListeners()
}

export { displayTasks }