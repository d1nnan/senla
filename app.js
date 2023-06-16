const buttons = document.querySelectorAll('.tabs-menu__btn')
const addButton = document.querySelector('.task-input__btn')
const textArea = document.querySelector('.task-input__txt-area')
let deleteButtons = document.querySelectorAll('.tasks-item__btn-delete')
const tasksList = document.querySelectorAll('.tasks-item')
const tasks = document.querySelector('.tasks')

let list = [
   {
      name: 'пить чай'
   }
]

buttons.forEach(button => {
   button.addEventListener('click', () => {
      unselect()
      select(button)
   })
})

addButton.addEventListener('click', () => {
   addTask(textArea.value)
})


function unselect() {
   buttons.forEach(button => {
      button.classList.remove('tabs-menu__btn_selected')
   })
}
function select(button) {
   button.classList.add('tabs-menu__btn_selected')
}

function addToLocalStorage(todos) {
   localStorage.setItem('todos', JSON.stringify(todos))
   outputTask(todos)
}

function getFromLocalStorage() {
   const ref = localStorage.getItem('todos')
   if (ref) {
      todos = JSON.parse(ref)
      outputTask(todos)
   }
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
      // tasksList.append(taskItem)

   })
   console.log(someList)
}

function init() {
   outputTask(list)
}
function addTask(task) {
   if (task !== '') {
      textArea.value = ''
      taska = {
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

// function deleteTask() {

// }

deleteButtons.forEach(button => {
   button.addEventListener('click', (event) => {
      console.log(event)
      event.target.parentElement.remove()
   })
})

tasksList.forEach(task => {
   task.addEventListener('click', (event) => {
      console.log(event)
      task.classList.add('tasks-item_checked')
   })
   // for (let i = 0; i < list.length; i++) {
   //    const task = list[i]
   //    task.addEventListener('click', () => {
   //       console.log('clicked')
   //       task.classList.add('tasks-item_checked')
})

init()