const MyApp = {
  todos: [
    {toDo: 'Clean fridge'},
    {toDo: 'Take out Puppy'},
    {toDo: 'Finish work'}
  ]
}

$(document).ready(() => {
  let $list = $('#todo-list')
  let $button = $('#new-thing-button')

  $button.on('click', handleButtonClick)
  $list.on('mouseenter mouseleave', 'li', handleMouse)
  $list.on('click', 'a.complete', handleComplete)
  $list.on('click', 'a.delete', handleDelete)
})

// EVENT HANDLERS
function handleButtonClick(event){
  event.preventDefault()
 
}

function handleMouse(event){
  
}

function handleComplete(event){
  event.preventDefault()
  
}

function handleDelete(event){
  event.preventDefault()
 
}
