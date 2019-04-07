# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Express

### Objectives
*After this lesson, students will be able to:*

- Use `npm` to manage project dependencies
- Create a simple web server using Express
- Learn to use named parameters on a web page

## Opening

The class introduces Node and Express. Node is a JavaScript runtime environment (ie a program for running JavaScript code) for running JS in a server environment. Express is a Node package that makes it trivial to setup a JavaScript web server. 


</details>

## Hello World - Express (We Do 30 min, 45 min)

Let's jump right into creating a simple "Hello World!" Express application.

In the terminal:
```bash
$ cd scratchpad/express-codealong
$ npm init -y
```
---

<details>
  <summary>
  Q. What did npm do just now?
  </summary>

  > `npm` stands for node package manager. NPM installs and manages dependencies (called Modules in JavaScript) for our nodeJS application.

  `$ npm init` will initialize a new NodeJS application. Upon initialization it
  will prompt you for some user input to update the package.json. Using the `-y` argument allows you to use the defaults and not prompt for any options.
</details>

```bash
$ cat package.json
{
  "name": "99bottles-handlebars",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

> The `package.json` file contains metadata about your app or module. NPM is also able to manage scripts related to the project. We won't dive into this but [more can be found here](https://css-tricks.com/why-npm-scripts/). Most relevant to us right now is that the file includes the list of project dependencies. There aren't any dependencies by default, so lets add one!

```bash
$ npm install --save express
```

> the `--save` flag updates the package.json to include the
dependency you just installed. We could manually edit the `package.json` file but conventionally we use the CLI tool.

We can see in `package.json` that the default main file for a node app is "index.js". We could change this, but we'll use the default for now.

Let's make a new file `$ touch index.js` and place the following contents. In
`index.js`:

```js
const express = require("express");
const app = express();

const PORT = 4000

app.listen(PORT, () => {
  console.log("app listening on port 4000");
}); 
```

We've required the Express module which is a function that returns an instance of a web app.
We invoke the module instantiating a constant `app` which holds all the methods and state we use to write and run our web app.
The listen method starts the app and specifies the port where the app will listen for requests.

Lets run the application:

```bash
$ node index.js
```
When we run the application we can see in the terminal `app listening on port 4000` The process continues to run occupying the shell process until we hit `ctrl + c`. Let's try going to the local host of that port number. In the browser enter
`http://localhost:4000`.

In the browser we'll see something like :

```
Cannot GET /
```

What does this mean?

We've told the server what port to listen on, but we didn't specify any route handlers. What is a route handler? If we recall last class, when working with APIs, we talked about endpoints. APIs handle these requests by setting up `routes`, and each `route` needs a handler, which is afunction that handles the request.
The absence of a `get` handler for the `"/"` route is our problem here.
Let's update `index.js`:

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```
We'll dive into the route handling methods momentarily.

We refresh and...

```
Cannot GET /
```

No change.
We added a route and handled it by sending the string `"hello world"` as the response.
So why is there no change? The answer is because we haven't restarted our server. Restart it by `ctrl + c` to stop the existing server, and then run the `$ node index.js` command again. Now, check the browser.

`Hello World`

Constantly needing to restart the server will get very tedious.

The node module `nodemon` (a portmanteau of "node monitor") can help. `nodemon` will watch our javascript files and automatically restart our node server whenever a file is changed. We use `nodemon` from the command line (demonstrated after install)

In the terminal:

```bash
$ npm install --global nodemon
```

> When using the `--global` flag (-g for short), we're specifying that nodemon
will be installed "globally" (not per project) so we can utilize nodemon across
all of our node applications (and also that it is not included in our project dependencies).

Then we start up our application a bit differently now. In the terminal:

```bash
$ nodemon index.js

[nodemon] 1.18.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
app listening on port 4000
```

Now, lets update what our `GET` route handle returns and see if the server updates.
After you make a change to the "hello world" text, you should see:

```bash
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
app listening on port 4000
```

## Params in URL in Express

In express, we can pass parameters to our server through the URL. This is a pretty common practice in web development. For example, when you go to a URL like "myblog.com/post/1", the "1" in the URL represents the id of a post. We send the ID of the post to our server via the URL. The route in our server might look like this:

```js
app.get("/post/:id", (req, res) => {
  // the req object has a params property that contains the id. Notice
  // in the route definition the id is preceeded by a :
  const postId = req.params.id

  // this would probably be a call to the database
  const post = Post.get(postId)
  res.send(post)
});
```

In our own `index.js`, lets add a new `GET` route so that accepts a parameter called `name`.

```js
app.get("/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});
```

Now, in our browser we can go to `http://localhost:4000/StanLee/` and see what happens!

We can return html here as a string and it will get rendered. Lets add an `anchor` element that has a link to a different name.

Update the route handler with the `name` parameter like so:

```js
app.get("/:name", (req, res) => {
  const greeting = `<h1>Hello ${req.params.name}</h1>`
  const link = `<a href="/Spider Man">Say Hello to Spidey</a>`

  res.send(greeting + link);
});
```

Here, we're wrapping the `greeting` in a `<h1>` heading tag, and we're creating a link that is an `anchor` element. Notice that the `anchor` element has an `href`, which, when clicked, will point our browser the whatever we put in there. Now, refresh the browser and click the link.

Pretty neat, huh?


<a name = "lab1"></a>
## Express Independent Practice

Open the [index.js](exercises/99bottles/index.js) file in the 99bottles directory.  Using what we just learned, do the following:

- Create an express application that provides a route that accepts a `numBottlesOfBeer` parameter
- The route should returns a string that consists of the correct line from the song and a link to the next line. 

- BONUS: what happens if someone puts a string in the URL instead of a number? How can you handle a string and still have the link work?

>REMEMBER: you'll have to initialize `npm` and add `express` as a dependency, because we're working in a new directory.
---


## Working With Views

We're going to be using handlebars again as a view template enginge. First, lets install Handlebars (`hbs`) as a project dependency:

```bash
$ npm install --save hbs
```

In `index.js`, [configure our express app](https://expressjs.com/en/guide/using-template-engines.html) to use Handlebars as its 'view engine' (there are [many other templating engines](https://github.com/expressjs/express/wiki#template-engines)):

```js
app.set("view engine", "hbs");
```

Let's go ahead and create a directory and some views. In the root directory of
the Express 99 bottles application. In the terminal:

```bash
$ mkdir views
$ touch views/index.hbs
$ touch views/layout.hbs
```

Let's change up our existing `index.js` to utilize a template rather than
sending in a string directly.

In `index.js`:

```js
/* instead of
app.get("/:numberOfBottles?", ( req, res ) => {
  let numberOfBottles = req.params.numberOfBottles || 99
  let next = numberOfBottles - 1
  if (numberOfBottles > 1){
    res.send(numberOfBottles + " bottles of beer on the wall <a href='/" + next + "'>Take one down pass it around")
  } else {
    res.send("1 bottle of beer on the wall <a href='/'>Start Over</a>")
  }
}) */

// we want this
app.get("/:numberOfBottles?", ( req, res ) => {
  let bottles = req.params.numberOfBottles || 99;
  let next = bottles - 1;
  res.render("index", {bottles, next});
})
```

Instead of directly building a string as the response of that get request, we instead want to render a view using Handlebars.
The `.render` function takes two arguments:
  - the first is the name of the view we want to render (since we've set the templating engine, we don't need to include the file extension).
  - the second argumentnis an object with values that will be made available in the view.

The only problem is our view is empty! Let's go ahead and change that now. In
`views/layouts.hbs`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
    <div class="main">
      {{{body}}}
    </div>
  </body>
</html>
```

Notice the `{{{body}}}` syntax. This is because Handlebars by default escapes
HTML and you need the additional set of brackets to indicate that you want to
render the tags in the body as HTML.

Finally we should update our index view to reflect the same strings we had
before. In `views/index.hbs`:

```html
<div class="container">
  <p class="bottle-text">
    {{bottles}} bottles of beer on the wall.
  </p>

  {{#if next}}
    <a class="button" href='/{{next}}'>Take One Down, Pass it Around</a>
  {{else}}
    <a class="button" href='/'>Start Over</a>
  {{/if}}
</div>
```

Lets review whats happening here. 
Recall that when we use `res.render()` in our `index.js` that we passed in two arguments: the name of the view to render, and some data. `{{bottles}}` and `{{next}}` ared passed in to the template.

We render the number of bottles (we aren't concerned with handling the right plural form at this point). Then we use some `conditional statements`, which are [built-in helpers from Handlebars](http://handlebarsjs.com/block_helpers.html). They work just like JavaScript if/else, but the syntax is a bit different.

There's one problem left: notice how the `anchor` tags have a class of `button`, and that in our `layout.hbs` template, we're referencing a css file, but no CSS is loading! Why might that be?

Our CSS file is inside of a `public` directory. We need to tell express to serve these public files. 

In `index.js` lets add the following:

```js
app.use(express.static('public'))
```

[Here is more documentation](https://expressjs.com/en/starter/static-files.html) about serving static files.

Now, refresh the browser. Wow, that looks a lot better!


## module.exports

<details>
<summary>How have we been loading scripts in the browser</summary>

> Using a script tag (`<script src="/path/to/script"></script>`) in our HTML to tell the client browser to request, load, and run a script

</details>


<details>
<summary>Why is this not an option in a server side environment?</summary>

> On the server, there is no HTML document. Sure, we can add `<script>` tags to the `layout.hbs`, but that doesn't make those modules available in our `index.js` file.
</details>

<details>
<summary>What does it mean to 'polute the global namespace' and how have we seen this problem in the browser?</summary>

> 'Poluting the global namespace' means declaring variables in global scope.
This is undesirable because the larger an app is and the more global scope is used, the more likely we are to have a collision where some part of the app uses a global variable for one purpose and different part of the app uses a global variable with the same name for another.

> In the browser, the _only_ way for different scripts to interact with one another is by way of the global namespace.


</details>

We have already seen the `require` method used to load JavaScript files and modules. The `require` method returns a value which can be set to a variable and does not need to be grabbed out of global scope.

The other end of the `require` method, is the `module.exports` object.
By assigning particular values to `module.exports`, we can explicitly define the object that will be brought in when another file `requires()` the file from which we are exporting.

For example:
```js
// calculator.js
module.exports = {
  add(a,b){
    return a + b
  }
}
```
We then use `require(./calculator.js)` to import a local file rather than a node module (like `require('express')`). Node is smart enough to know when you're trying to import a module fron `node_modules`, and when you're trying to import a local file.

Since the argument to require a local file needs to be a path, the path to a file in the same directory needs to be prefaced with a `./`.

```js
// in index.js
// instantiate global variable to grant access to module we've created
const calculator = require("./calculator.js");

// use variable to call the .add() function defined in calculator.js
calculator.add(3,4)
```

A practical example would be to import our route handlers from a seperate file:

```js
const bottlesController = require('./controllers/bottles.js')
app.get('/:numberOfBottles?', bottlesController.getBottles)
```

We create a controller for our bottles. The controller acts as a bridge between the server and the client, or the Model and the View. Let's create a `controllers/bottles.js`.

```bash
$ mkdir controllers
$ touch controllers/bottles.js
```
Lets fill the new file with the following:
```js
const BottlesController = {
  getBottles: function (req, res) {
    let bottles = parseInt(req.params.numberOfBottles) || 99;
    let next = bottles - 1;
    res.render("index", {bottles, next});
  }
}

module.exports = BottlesController

```


> We see the exact same behavior; just moved some logic into a different file.
What advantages does that bring to us with regard to separation of concerns in MVC?

Now, lets require the new controller in our `index.js` file.

```js
const bottlesController = require('./controllers/bottles.js')
```

Now, lets update our `numberOfBottles` route handler to use the controller.

```js
app.get('/:numberOfBottles?', bottlesController.getBottles)
```

Refresh the browser, and everything should work just as it did before. 

## HTML Forms: Bodyparser & Post requests

Let's personalize our 99 bottles app.  We'll make a welcome page with a form asking for user's name.

We need a route and a view (with a form)


```js
app.get("/", (req, res) => {
  res.render("welcome");
});
```

```html
<!-- views/welcome.hbs -->
<div class="container">
  <h1 class="heading">Welcome to 99 Bottles</h1>
  <form class="form" action="/" method="post">
    <label for="player_name">Please enter your name</label>
    <input class="input __text" id="player_name" type="text" name="player_name">
    <input class="input __submit button" type="submit">
  </form>
</div>
```

Submit a name:

```
Cannot POST /
```

Why do we get this error? Notice the `method` on our `form`. Its a `POST`, but we haven't created a route-handler for a `POST` request. 

> In `index.js`...

```js
app.post('/', bottlesController.welcomePlayer)
```

Save your file. You should get an error in your console, that says something like:

```bash
Error: Route.post() requires a callback function but got a [object Undefined]
```

Well duh, we need to update our `BottlesController` to provide a `welcomePlayer` method. 
> In `controllers/bottles.js

```js
const BottlesController = {
  getBottles: function (req, res) {
    let bottles = req.params.numberOfBottles || 99
    let next = bottles - 1
    res.render('index', {
      player_name: req.query.player,
      bottles,
      next
    })
  },
  welcomePlayer: function (req, res) {
    res.send("hello")
  }
}
```

Well it works, but it's not super valuable, we're not even getting our
parameter.
Let's greet the name submitted in the form:

```js
welcomePlayer: function (req, res) {
  res.send("Hello " + req.params.player_name)
}
```

`hello undefined`... oh man.. and just to be sure let's `console.log(req.params)`.
It's an empty object!

Our html form information is not in `req.params`. Express is not handling information posted from an html form.  We need to install `middleware` in order to get form data and JSON data in a POST request for Express applications. 

Middleware is code that runs in between receiving the request and responding. We'll need to add a middleware called `body-parser`. [Lets look at the docs](https://github.com/expressjs/body-parser)

In the terminal:

```bash
$ npm install --save body-parser
```

In `index.js`:

```js
// configure app to use body parser
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //handles json post requests
app.use(bodyParser.urlencoded({ extended: true })); // handles form submissions
```

> Note: technically only the urlencoded bodyparser middleware is necessary to get this form working.
The json bodyparser is necessary if we want to handle AJAX requests with JSON bodies.

Another thing to note is that, in Express, `req.params` holds just path params.
Anything handled by the bodyParser (json or form bodies) will be held in `req.body`.
If you want to get at values in a query string (ie url after a `?`), these values will be held in `req.query`

So we change the final post request in index.js to:

```js
welcomePlayer: function (req, res) {
  res.send(`Hello ${req.body.player_name}`)
}
```

Now, lets integrate it into our `index.hbs` view. 

First, update the controller:
```js
  welcomePlayer: function (req, res) {
    res.render('index', {
      player_name: req.body.player_name,
      bottles: 99,
      next: 98
    })
  }
```

And to our view:
```html
  {{#if player_name}}
    <h1 class="player-name">Greetings {{player_name}}</h1>
  {{/if}}
```

Now, refresh your browser. Voila!

## For Fun (time allowing)

Lets take a look at the [Giphy Viewer](./for-fun/giphy-viewer/server.js) server file.

## Homework

Take a look at the [assignment](homework/assignment.md)!

