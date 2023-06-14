const buttons = document.querySelectorAll('.tabs-menu__btn')
const addButton = document.querySelector('.task-input__btn')
const textArea = document.querySelector('.task-input__txt-area')


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

function outputTask(task) {
   const ttt = document.createElement('div')
   ttt.setAttribute('class', 'task-container__task')
   ttt.innerHTML = task
   document.querySelector('.task-container').appendChild(ttt)
}

function addTask(task) {
   if (task !== '') {
      textArea.value = ''
      outputTask(task)
   }
   else {
      console.log('enter task')
   }
}
