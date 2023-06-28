const buttons = document.querySelectorAll('.tabs-menu__btn')
const addButton = document.querySelector('.task-input__btn')
const textArea = document.querySelector('.task-input__txt-area')
const tasks = document.querySelector('.tasks')
const searchBtn = document.querySelector('.search-form__btn')
const searchInput = document.querySelector('.search-task')
const allBtn = document.querySelector('.tabs-menu__btn-all')
const importantBtn = document.querySelector('.tabs-menu__btn-important')
const doneBtn = document.querySelector('.tabs-menu__btn-done')
const loaderWrapper = document.querySelector('.loader-wrapper')

let filterActive = false

let todoList = [
   {
      id: String(new Date().valueOf()),
      name: 'пить чай',
      checked: false,
      important: false
   }
]

let filteredTodoList = []

function unselect() {
   buttons.forEach(button => {
      button.classList.remove('tabs-menu__btn_selected')
   })
}

function select(button) {
   button.classList.add('tabs-menu__btn_selected')
}

function getFromLocalStorage() {
   if (localStorage.getItem('todos')) {
      todoList = JSON.parse(localStorage.getItem('todos'))
   }
}

function setToLocalStorage() {
   localStorage.setItem('todos', JSON.stringify(todoList))
}

function renderTasks() {
   const listToRender = filterActive ? filteredTodoList : todoList
   tasks.innerHTML = ""
   listToRender.forEach(function (item) {
      const taskItem = document.createElement('div')
      taskItem.setAttribute('class', 'tasks-item')
      document.querySelector('.tasks').appendChild(taskItem)

      const taskText = document.createElement('div')
      const starImg = document.createElement('div')
      taskItem.appendChild(taskText)

      taskText.setAttribute('class', 'tasks-item__text')
      taskText.innerHTML = `${item.name}`

      const btnMarker = document.createElement('button')
      btnMarker.classList.add('tasks-item__btn-marker')
      taskItem.appendChild(btnMarker)
      btnMarker.innerHTML = 'MARK AS IMPORTANT'

      const btnDelete = document.createElement('button')
      btnDelete.setAttribute('class', 'tasks-item__btn-delete')
      taskItem.appendChild(btnDelete)

      taskItem.setAttribute('data-key', item.id)

      if (item.checked) {
         taskItem.classList.add('tasks-item_checked')
      }

      if (item.important) {
         taskItem.classList.remove('tasks-item__btn-marker')
         btnMarker.style.background = '#bab9b9'
         btnMarker.innerHTML = 'NOT IMPORTANT'

         starImg.setAttribute('class', 'tasks-item__star')
         taskItem.appendChild(starImg)
         taskItem.insertBefore(starImg, taskText)
      }
   })
}

function init() {
   getFromLocalStorage()
   renderTasks()
   setTimeout(() => {
      hideLoader()
   }, 2000)
}

function showLoader() {
   loaderWrapper.classList.remove('loader-wrapper_hidden')
}

function hideLoader() {
   loaderWrapper.classList.add('loader-wrapper_hidden')

}

function addTask(task) {
   if (task.trim() !== '') {
      textArea.value = ''
      const newTask = {
         id: String(new Date().valueOf()),
         name: task,
         checked: false,
         important: false
      }
      todoList.unshift(newTask)

   }
   else {
      console.log('enter task')
   }
}

function deleteTask(id) {
   todoList = todoList.filter((todo) => {
      return todo.id !== id
   })
}

function checkTask(id) {
   todoList.forEach((task) => {
      if (task.id === id) {
         task.checked = !task.checked
      }
   })
}

function changeMarker(id) {
   todoList.forEach((task) => {
      if (task.id === id) {
         task.important = !task.important
      }
   })
}

function searchTask(taskToFind) {
   if (taskToFind !== '') {
      filteredTodoList = todoList.filter((task) => {
         return task.name.includes(taskToFind)
      })
   }
   else {
      filteredTodoList = todoList
   }
}

function filterImportant() {
   filteredTodoList = todoList.filter((task) => {
      return task.important
   })
}

function filterDone() {
   filteredTodoList = todoList.filter((task) => {
      return task.checked
   })

}

tasks.addEventListener('click', (event) => {
   const isBtnDelete = event.target.classList.contains('tasks-item__btn-delete')
   if (isBtnDelete) {
      const taskId = event.target.parentElement.getAttribute('data-key')
      deleteTask(taskId)
      setToLocalStorage()
      renderTasks()
   }
   const isTaskItem = event.target.classList.contains('tasks-item')
   if (isTaskItem) {
      const taskId = event.target.getAttribute('data-key')
      checkTask(taskId)
      setToLocalStorage()
      renderTasks()
   }

   const isMarked = event.target.classList.contains('tasks-item__btn-marker')
   if (isMarked) {
      const taskId = event.target.parentElement.getAttribute('data-key')
      changeMarker(taskId)
      filterImportant()
      setToLocalStorage()
      renderTasks()
   }
})

buttons.forEach(button => {
   button.addEventListener('click', () => {
      unselect()
      select(button)
   })
})

addButton.addEventListener('click', () => {
   showLoader()
   setTimeout(() => {
      hideLoader()
      addTask(textArea.value)
      setToLocalStorage()
      renderTasks()
   }, 2000)
})

searchBtn.addEventListener('click', () => {
   searchTask(searchInput.value.trim())
   renderTasks()
})

allBtn.addEventListener('click', () => {
   filterActive = false
   renderTasks()
})

importantBtn.addEventListener('click', () => {
   filterActive = true
   filterImportant()
   renderTasks()
})

doneBtn.addEventListener('click', () => {
   filterActive = true
   filterDone()
   renderTasks()
})

init()