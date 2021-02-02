import todos from './todos.js'

const displayTasks = (todosArray, originalArray) => {

  const completeSection = document.querySelector('#complete')
  const incompleteSection = document.querySelector('#incomplete')

  //Clear the section to avoid repeats

  completeSection.innerHTML = ''
  incompleteSection.innerHTML = ''


  //Place an item for each todo in the todos array

  todosArray.forEach(todo => {

    //Create a row for Flex purposes, and the task

    const taskSection = document.createElement('section')
    taskSection.className = 'task-row'
    const task = document.createElement('p')
    task.className = 'task'

    //All tasks have a delete button, so placed out here.

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete'
    deleteButton.innerHTML = 'X'

    //If there is a finished task place it in completed section

    if(todo.completed){
      task.id = 'completed'
      task.innerHTML = todo.task
      taskSection.appendChild(task)
      taskSection.appendChild(deleteButton)
      completeSection.appendChild(taskSection)
    } else {

    //Otherwise place it in unfinished with a finish button

      const finishButton = document.createElement('button')
      finishButton.className = 'finish'
      finishButton.innerHTML = '&#10003'
      task.innerHTML = todo.task
      task.id = 'incompleted'
      taskSection.appendChild(task)
      taskSection.appendChild(deleteButton)
      taskSection.appendChild(finishButton)
      incompleteSection.appendChild(taskSection)
    }
    deleteListeners(todosArray, originalArray)
    finishListeners(todosArray, originalArray)
  })
}

//Helper functions to DRY code

const findIdByText = (text, inputArray) => {
  return inputArray.findIndex(todo => {
    return todo.task.toLowerCase().trim() === text.toLowerCase().trim()
  })
}

const removeById = (id, inputArray) => {
  inputArray.splice(id, 1)
}

const markDone = (id, inputArray) => {
  inputArray[id].completed = true
}

//Handlers and listeners for the delete and finish buttons

const deleteHandler = (task, section, todosArray, originalArray) => {
  let taskID = findIdByText(task.innerText, todosArray)
  removeById(taskID, todosArray)
  section.remove()
  if(originalArray !== undefined) {
    taskID = findIdByText(task.innerText, originalArray)
    removeById(taskID, originalArray)
    saveTodos(originalArray)
  } else {
    saveTodos(todosArray)
  }
}

const deleteListeners = (todosArray, originalArray) => {
  const deleteButtons = document.querySelectorAll('.delete')
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => { 
      event.preventDefault()
      const task = event.target.previousSibling
      const section = event.target.parentNode
      deleteHandler(task, section, todosArray, originalArray)
    })
  })
}

const finishHandler = (task, todosArray, originalArray) => {
  let taskID = findIdByText(task.innerText, todosArray)
  markDone(taskID, todosArray)
  displayTasks(todosArray)
  if(originalArray !== undefined) {
    taskID = findIdByText(task.innerText, originalArray)
    markDone(taskID, originalArray)
    saveTodos(originalArray)
  } else {
    saveTodos(todosArray)
  }
}

const finishListeners = (todosArray, originalArray) => {
  const finishButtons = document.querySelectorAll('.finish')
  finishButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const task = event.target.previousSibling.previousSibling
      finishHandler(task, todosArray, originalArray)
    })
  })
}

const saveTodos = (userArray) => {
  const userTodosJSON = JSON.stringify(userArray)
  localStorage.setItem('userTodos', userTodosJSON)
}

export { displayTasks, saveTodos }