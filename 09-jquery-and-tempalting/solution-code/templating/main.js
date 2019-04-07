const MyApp = {
  todos: [
    {toDo: 'Clean fridge'},
    {toDo: 'Take out Puppy'},
    {toDo: 'Finish work'}
  ]
}

MyApp.compileItem = item => {
  let source = $('#to-do-template').html()
  let template = Handlebars.compile(source)
  return template(item)
}

MyApp.populateList = $list => {
  MyApp.todos.forEach(todo => {
    let compiledTodo = MyApp.compileItem(todo)
    $list.append(compiledTodo)
  })
}

MyApp.addToList = ($list, toDoItem) => {
  let newTodoObject = {toDo: toDoItem}
  MyApp.todos.push(newTodoObject)
  let compiledTodo = MyApp.compileItem(newTodoObject)
  $list.append(compiledTodo)
  $('#new-thing').val('')
}

MyApp.removeFromList = function ($list, $item) {
  let itemIndex = $item.index()
  if (itemIndex > -1) { MyApp.todos.splice(itemIndex, 1) }
  $item.remove()
}

$(document).ready(() => {
  let $list = $('#todo-list')
  let $button = $('#new-thing-button')

  MyApp.populateList($list)

  $button.on('click', handleButtonClick)
  $list.on('mouseenter mouseleave', 'li', handleMouse)
  $list.on('click', 'a.complete', handleComplete)
  $list.on('click', 'a.delete', handleDelete)
})

// EVENT HANDLERS
function handleButtonClick(event){
  event.preventDefault()
  let $list = $('#todo-list')
  let newTodoValue = $('#new-thing').val()

  if (newTodoValue){
    MyApp.addToList($list, newTodoValue)
  }
}

function handleMouse(event){
  if (event.type === 'mouseenter') {
    $(this).removeClass('inactive')
    $(this).siblings().addClass('inactive')
  } else if (event.type === 'mouseleave') {
    $(this).siblings().removeClass('inactive')
  }
}

function handleComplete(event){
  event.preventDefault()
  let $item = $(this).parent('li')
  $item.toggleClass('completed')
}

function handleDelete(event){
  event.preventDefault()
  let $list = $('#todo-list')
  let $item = $(this).parent('li')
  MyApp.removeFromList($list, $item)
}
