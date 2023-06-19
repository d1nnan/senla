const buttons = document.querySelectorAll('.tabs-menu__btn')
const addButton = document.querySelector('.task-input__btn')
const textArea = document.querySelector('.task-input__txt-area')
const deleteButtons = document.querySelectorAll('.tasks-item__btn-delete')
const tasksList = document.querySelectorAll('.tasks-item')
const tasks = document.querySelector('.tasks')

let list = [
   {
      id: String(new Date().valueOf()),
      name: 'пить чай'
   }
]

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
      // const ref = localStorage.getItem('todos')
      let todos = JSON.parse(localStorage.getItem('todos'))
      outputTask(todos)
   }
   else {
      ref = []
   }
}

function addToLocalStorage(todos) {
   localStorage.setItem('todos', JSON.stringify(todos))
   getFromLocalStorage()
}

function outputTask(someList) {
   tasks.innerHTML = ""
   someList.forEach(function (item) {
      const taskItem = document.createElement('div')
      taskItem.setAttribute('class', 'tasks-item')
      taskItem.innerHTML = `${item.name}`
      const btnDelete = document.createElement('button')
      btnDelete.setAttribute('class', 'tasks-item__btn-delete')
      taskItem.appendChild(btnDelete)
      document.querySelector('.tasks').appendChild(taskItem)
      taskItem.setAttribute('data-key', item.id)
   })
   // console.log(someList)
}

function init() {
   getFromLocalStorage()
}

function addTask(task) {
   if (task.trim() !== '') {
      textArea.value = ''
      taska = {
         id: String(new Date().valueOf()),
         name: task
      }
      list.unshift(taska)
      console.log('pushed')
      for (let i = 0; i < list.length; i++) {
         const element = list[i]
         console.log(element)
      }
      addToLocalStorage(list)
   }
   else {
      console.log('enter task')
   }
}

function deleteTask(id) {
   list = list.filter((todo) => {
      // console.log(todo.id, id)
      return todo.id !== id
   })
   addToLocalStorage(list)
   // console.log(list)
}

tasks.addEventListener('click', (event) => {
   if (event.target.classList.contains('tasks-item__btn-delete')) {
      deleteTask(event.target.parentElement.getAttribute('data-key'))
      // console.log(event.target.parentElement.getAttribute('data-key'))
   }
})

tasks.addEventListener('click', (event) => {
   // console.log(event)
   // console.log(event.target.getAttribute('data-key'))
   event.target.classList.toggle('tasks-item_checked')
   // checkTask(event.target.getAttribute('data-key'))
})

buttons.forEach(button => {
   button.addEventListener('click', () => {
      unselect()
      select(button)
   })
})

addButton.addEventListener('click', () => {
   addTask(textArea.value)
})

init()