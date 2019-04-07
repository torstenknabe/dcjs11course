# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) DOM/jQuery Continued and Templating (3:00)

- Events Continued
- Event Delegation and Best Practices|
- Appending
- Separation of Concerns and Templating
- Templating
- Independent Practice
- Final Questions & Exit Tickets


### Objectives
*After this lesson, students will be able to:*

- Implement advanced jQuery events.
- Use event delegation to manage dynamic content.
- Use implicit iteration to update elements of a jQuery selection and chaining to place methods on selectors.
- Add a templating language to our projects for better and more abstracted content manipulation.

### Preparation
*Before this lesson, students should already be able to:*

- Register and trigger event handles for jQuery click event.
- Manipulate the DOM by using jQuery selectors and functions.

> Note: Last class, we learned how to manipulate the DOM using jQuery selectors! Check with students to make sure that everyone is comfortable with the materials covered in the last class.

---
<a name = "opening"></a>
## Events Continued (15 minutes)
Last lesson we learned what the DOM was and how to manipulate it with vanilla JavaScript and jQuery. We got a taste of jQuery's power in making our interaction with the DOM significantly easier. Although we covered the basics of using jQuery, such as selecting DOM elements, adding content, and listening for a basic click event, we need to understand jQuery events and DOM manipulation more intimately for true dynamic applications. In this lesson we will work with additional jQuery events and understand implications of adding dynamic content to our pages. We will also work with a templating engine for better separation of concerns in our code.

We were able to implement a click event in the last lesson, however jQuery [and JavaScript] gives us the ability to listen to a plethora of additional user events. Additionally, what if we have multiple events for specific elements? What if we want to listen for events to elements that have not yet been added to our interface?

We can listen for mouse, keyboard, form, and document/window events. Today we will focus on mouse events, however listening to other events is very similar to mouse events.

*Mouse Events:*
- click
- dblclick
- mouseenter
- mouseleave

*Keyboard Events*
- keypress
- keydown
- keyup

*Form Events*
- submit
- change
- focus
- blur

*Document/Window Events*
- load
- resize
- scroll
- unload

---
## Event Delegation and Best Practices
We started covering mouse events with the click event. We can add additional mouse events in the same manner.

```js
  $things.on('mouseenter', function(e) {
    $(this).removeClass('inactive');
    $(this).siblings().addClass('inactive');
  }); 

  $things.on('mouseleave', function(e) {
    $(this).siblings().removeClass('inactive');
  });
```
The above code listens for two events:

1. User's mouse set to enter the list item element. In this case, it removes the 'inactive' class from itself (if it exists) and adds it to its sibling list items.
2. User's mouse set to leave the list item element. This removes the 'inactive' class from all elements on the same level.

While the above code works great for existing elements, if we add new elements to the DOM, the events will not fire up for the newly added elements.

It is important to understand that these direct events are only attached to elements at the time that the 'on' method is called. If list items did not exist when the above events were called, they do not get included in the calls above.

To get around this, we create a delegated event, which requires us to add the element our event handler executes for, to the right side. Take the above code and modify to:

```js
  $thingList.on('mouseenter', 'li', function(e) {
    $(this).removeClass('inactive');
    $(this).siblings().addClass('inactive');
  });

  $thingList.on('mouseleave', 'li', function(e) {
    $(this).siblings().removeClass('inactive');
  });
```

Our code is getting a little inefficient and duplicative. Our list items have two event handles attached to them. We can handle both of the above scenarios with one event handler. Grouping our events by element not only helps us group our code, but it is also a drastically faster operation.

```js
  $thingList.on('mouseenter mouseleave', 'li', function(event) {
       if (event.type == 'mouseenter') {
         $(this).removeClass('inactive');
         $(this).siblings().addClass('inactive');
      } else if (event.type == 'mouseleave') {
          $(this).siblings().removeClass('inactive');
      }
  });
```
---
## Appending: Independent Practice (30 mintutes)

Open [the starter code](starter-code/event_delegation) and refactor it as follows: use event delegation so that you only have to set one event listener for all the items once - when the code first runs - and you don't have to add any others whenever someone adds an item.

**Bonus**:

- When the user mouses over each item, the item should turn grey. Don't use CSS hovering for this
- Add another link, after each item, that allows you to delete the item

---

<a name = "introduction"></a>
## Separation of Concerns and Templating

Through event handlers and DOM manipulation we are able to making our applications more dynamic, interactive, responsive, and just plain fun. However, even with a small to do list app, our code is starting to grow significantly. If we keep stacking features, our code will soon become much more difficult to manage. We are currently having to interact with our data as DOM elements. As our applications start forming relationships, it will become very messy to get values, serialize them, and pass them around.

This is why separating our data from our view logic becomes very important. We can still use jQuery to interact with the DOM and listen for user events, however our business rules (data) should be kept separate from the view. This is where templating becomes very useful.

Templating lets us reference a snippet of code, and populate it with data we store in actual JavaScript objects, before adding it to the DOM. There are many JavaScript templating libraries like [Handlebars](http://handlebarsjs.com/), [Mustache](http://mustache.github.io/), and [Underscore templates](http://underscorejs.org/). Today we will be working with [Handlebars](http://handlebarsjs.com/).

---

<a name = "codealong2"></a>
## Templating: Codealong
Handlebars has a 4 step process to implementing templates in our applications:

  1. Create the template(s)
  2. Reference and compile template
  3. Pass the object to compile to Handlebars
  4. Add the new compiled element to DOM


1. We create our element surrounded in script tags with a reference id and a type of handlebars template. We surround the content that's to be replaced by double curly brackets.

  ```html
    <script id="hello-world-template" type="text/x-handlebars-template">
      <h1>{{title}}</h1>
      <p>{{content}}</p>
    </script>
  ```

2. We can then use jQuery to reference the newly created template and pass that reference to Handlebars.

  ```js
    // choose our source tempalte
    let source = $('#hello-world-template').html();

    // compile the base template using handlebars and our source
    let template = Handlebars.compile(source);

    // we create some data that we can pass into our template
    let helloStatement = { title: "Hello world", content: "JavaScript runs the world"};

    // pass the data into the base compiled tempalte
    let compiledTemplate = template(helloStatement);

    // add the compiled tempalte to the DOM
    $('body').append(compiledTemplate);
  ```

This routine allows us to organize our code by DOM and event logic (usually taken care of by jQuery in our case) and by model logic (currently just JS models). This will help interacting with data sets much cleaner and more manageable.

---

<a name = "lab2"></a>
## To Do List: Code Along

We're going to build on top of the to-do list app to store our initial to-do data in a JavaScript object and interact with the object whenever the user interacts with the DOM.

1. Use Handlebars to add any new DOM content.

2. Store all of your data in a todos object.

3. Organize our code so our app logic is DRY.

4. Create a method we can reference in our app to compile our data to Handlebars templates, instead of relying on doing this every time you need to add a DOM object
---

First, we'll need to update our `index.html` file to include a template for each to-do item. After the `<form>` tag, lets add a new `<script>` tag that acts as our ToDo Item Template.

```html
<script id="to-do-template" type="text/x-handlebars-template">
  <li class="">{{toDo}} <a href="#" class="complete">Complete</a> <a href="#" class="delete">Delete</a></li>
</script>
```

Our template is a `<li>` tag that renders the `{{toDO}}` as a string. It also contains a link for completeing and deleteing the item. Also, lets remove the old `hello-world-tempalte` script tag.

Next, we need to render our starting list of todo items, But right now, it's just an array on our `MyApp` object. We need to render these items using handlebars. We're going to use `MyApp` to control the rendering of our application. Its going to contain all the business logic we need. So it makes sense that we would create a function on `MyApp` that can populate the list of items.

```js
// populates the initial todo items and renders them to our list
MyApp.populateList = $list => {
  // we iterate through each of our starting todos
  MyApp.todos.forEach(todo => {
    // get the source template
    let source = $('#to-do-template').html()
    // compile the base template
    let template = Handlebars.compile(source)
    // apply the todo item to our template and append it to our list
    $list.append(template(todo))
  })
}
```

Now we can see that we get a list of items, each with a complete and delete link. Next, we need to handle adding new items to our list. Again, we'll create a function on the `MyApp` object that can handle that.

```js
// add a new item to our list
MyApp.addToList = ($list, toDoItem) => {
  // create a new Todo Object
  let newTodoObject = {toDo: toDoItem}
  // push it to our todos array in MyApp
  MyApp.todos.push(newTodoObject)

  // get the source template
  let source = $('#to-do-template').html()
  // compile the base template
  let template = Handlebars.compile(source)
  // append new To Do item to our list in the DOM
  $list.append(template(newTodoObject))
  // reset value of the input field
  $('#new-thing').val('')
}
```

Now, we can see that there is some repetition of code. Notice that in both `addToList` and `populateList` we have to get the source template and compile it with Handlebars. How can we refactor this to make it more DRY? 

```js
// create a function that compiles an item
MyApp.compileItem = item => {
  // get the source template
  let source = $('#to-do-template').html()
  // compile the base template
  let template = Handlebars.compile(source)
  // return a compiled template with data
  return template(item)
}
```

Now, we can update our `addToList` and `populateList` functions to use `compileItem`.

```js
// populates the initial todo items and renders them to our list
MyApp.populateList = $list => {
  MyApp.todos.forEach(todo => {
    let compiledTodo = MyApp.compileItem(todo)
    $list.append(compiledTodo)
  })
}

// add a new item to our list
MyApp.addToList = ($list, toDoItem) => {
  let newTodoObject = {toDo: toDoItem}
  MyApp.todos.push(newTodoObject)
  let compiledTodo = MyApp.compileItem(newTodoObject)
  $list.append(compiledTodo)
  $('#new-thing').val('')
}
```

That's much better! We can see as we code that opportunities for refactoring occur all the time. 

Now, we just need to wire up the rest of our event listeners. Take some time on your own to figure out how to wire up the rest of the events. The handling functions have been stubbed out for you.

When it comes to deleting an item, remember you'll need to remove it from the DOM, but also update the array in `MyApp`. In order to update the array, you'll need to know the index of the item that is deleted. How can you use jQuery to get the `index` of the list item that was clicked on? If you don't know, try searching for some documentation. 


<a name = "conclusion"></a>
## Conclusion

* What is event delegation? Why would we use it?
* Why would we want to use templating?

#### Further Resources

- [jQuery: Event delegation][1]
- [Handlebars.js][2]
- [jQuery: Handling events][3]
- [Advanced reading: Understanding MVVM][4]
- [JavaScript MVC][5]

[1]: https://learn.jquery.com/events/event-delegation/
[2]: http://handlebarsjs.com/
[3]: https://learn.jquery.com/events/handling-events/
[4]: http://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/
[5]: http://alistapart.com/article/javascript-mvc
