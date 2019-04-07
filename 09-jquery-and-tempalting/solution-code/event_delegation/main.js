/* Independent Practice

Making a favorites list: event delegation

Refactor the code below.

The difference will be: use event delegation so that you only have
to set one event listener for all the items once, when the
code first runs, and you don't have to add any others whenever
someone adds an item.

Bonus: When the user mouses over each item, the item should turn grey. Don't use CSS hovering for this.

Bonus 2: Add another link, after each item, that allows you to delete the item.

*/

function addToList ($list, thing) {
  let $thingLi = $('<li>').html(thing).addClass('fav-thing')
  addCompleteLink($thingLi)
  
  // Bonus 2
  addDeleteLink($thingLi)

  $list.append($thingLi)
}

function addCompleteLink ($li) {
  let $completedLink = $('<span>').html(' complete task').addClass('complete-task')
  $li.append($completedLink)
}

// BONUS 2
function addDeleteLink ($li) {
  let $deleteLink = $('<span>').html(' delete task').addClass('delete-task')
  $li.append($deleteLink)
}

$(document).ready(function () {
  let $thingList = $('#fav-list')
  let $things = $('.fav-thing')
  let $button = $('#new-thing-button')
  let $newThingInput = $('#new-thing')

  $things.each(function() {
    addCompleteLink($(this))

    // BONUS 2
    addDeleteLink($(this))
  })

  $button.on('click', function (event) {
    event.preventDefault()
    let newThing = $newThingInput.val()
    if (newThing === '') {
      alert('You must type in a value!')
    } else {
      addToList($thingList, newThing)
      $newThingInput.val('')
    }
  })

  $thingList.on('click', '.complete-task', function (event) {
    let $thingItem = $(this).parent()
    $thingItem.addClass('completed')
    $(this).html('')
  })

  // Bonus
  $thingList.on('mouseenter mouseleave', 'li', function(event){
    if (event.type === 'mouseenter') {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })

  // BONUS 2
  $thingList.on('click', '.delete-task', function (event) {
    let $thingItem = $(this).parent()
    $thingItem.remove()
  })
})
