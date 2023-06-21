const buttons = document.querySelectorAll('.tabs-menu__btn')
const addButton = document.querySelector('.task-input__btn')
const textArea = document.querySelector('.task-input__txt-area')
const deleteButtons = document.querySelectorAll('.tasks-item__btn-delete')
const tasksList = document.querySelectorAll('.tasks-item')
const tasks = document.querySelector('.tasks')
const searchBtn = document.querySelector('.search-form__btn')
const searchInput = document.querySelector('.search-task')

let todoList = [
   {
      id: String(new Date().valueOf()),
      name: 'пить чай',
      checked: false
   }
]

let foundTask = []

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

function renderTasks(listToRender) {
   tasks.innerHTML = ""
   listToRender.forEach(function (item) {
      const taskItem = document.createElement('div')
      taskItem.setAttribute('class', 'tasks-item')
      taskItem.innerHTML = `${item.name}`
      const btnDelete = document.createElement('button')
      btnDelete.setAttribute('class', 'tasks-item__btn-delete')
      taskItem.appendChild(btnDelete)
      document.querySelector('.tasks').appendChild(taskItem)
      taskItem.setAttribute('data-key', item.id)
      if (item.checked) {
         taskItem.classList.add('tasks-item_checked')
      }
   })
}

function init() {
   getFromLocalStorage()
   renderTasks(todoList)
}

function addTask(task) {
   if (task.trim() !== '') {
      textArea.value = ''
      const newTask = {
         id: String(new Date().valueOf()),
         name: task,
         checked: false
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

function searchTask(taskToFind) {
   for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].name === taskToFind) {
         foundTask = todoList.filter((task) => {
            return taskToFind === task.name
         })
      }
   }

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
      renderTasks(todoList)
   }
})


buttons.forEach(button => {
   button.addEventListener('click', () => {
      unselect()
      select(button)
   })
})

addButton.addEventListener('click', () => {
   addTask(textArea.value)
   setToLocalStorage()
   renderTasks(todoList)
})

searchBtn.addEventListener('click', () => {
   searchTask(searchInput.value)
   setToLocalStorage()
   renderTasks(foundTask)
})

init()