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
  deleteListeners(todosArray, originalArray)
  finishListeners(todosArray, originalArray)
  if(originalArray !== undefined) {
    saveTodos(originalArray)
  } else {
    saveTodos(todosArray)
  }
}

//Helper functions to DRY code

const findIdByUUID = (UUID, inputArray) => {
  return inputArray.findIndex(todo => {
    return todo.uuid === UUID
  })
}

const removeById = (id, inputArray) => {
  inputArray.splice(id, 1)
}

const markDone = (id, inputArray) => {
  inputArray[id].completed = true
}

const saveTodos = (userArray) => {
  const userTodosJSON = JSON.stringify(userArray)
  localStorage.setItem('userTodos', userTodosJSON)
}

//Handlers and listeners for the delete and finish buttons

const deleteHandler = (task, todosArray, originalArray) => {
  let taskID = findIdByUUID(task.uuid, todosArray)
  removeById(taskID, todosArray)
  if(originalArray !== undefined) {
    taskID = findIdByUUID(task.uuid, originalArray)
    removeById(taskID, originalArray)
  }
  displayTasks(todosArray, originalArray)
}

const deleteListeners = (todosArray, originalArray) => {
  const deleteButtons = document.querySelectorAll('.delete')
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => { 
      event.preventDefault()
      const task = event.target.previousSibling
      deleteHandler(task, todosArray, originalArray)
    }, false)
  })
}

const finishHandler = (task, todosArray, originalArray) => {
  let taskID = findIdByUUID(task.uuid, todosArray)
  markDone(taskID, todosArray)
  if(originalArray !== undefined) {
    taskID = findIdByUUID(task.uuid, originalArray)
    markDone(taskID, originalArray)
  }
  displayTasks(todosArray, originalArray)
}

const finishListeners = (todosArray, originalArray) => {
  const finishButtons = document.querySelectorAll('.finish')
  finishButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const task = event.target.previousSibling.previousSibling
      finishHandler(task, todosArray, originalArray)
    }, false)
  })
}

export { displayTasks }