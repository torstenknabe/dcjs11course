# Intro to React.js

---

![react-logo](./images/react-white-logo.png)

---

## Learning Objectives

* Explain what ReactJS is and where it fits in our applications' stack.
* Explain the component model of web development.
* Describe what the 'virtual DOM' is and why it is so important to React's performance
* Explain the role of props and state and the differences between each
* Describe the role of JSX in a React app
* Create and render React components in the browser.
* Pass in data to a React component via `props`.
* Nest React components.
* Modify the `state` of a React component through events.

---

### What is ReactJS?

React is a JavaScript library used to craft modern day UI and views for the front-end in web applications.

> **Selling Point:** By modeling small compatible components that focus on just rendering a view, we can move business logic out of the DOM, and therefore improve our app's performance, maintainability, modularity and readability.

#### Some History

The first thing most people hear about React is "Facebook uses it."
* First used by Facebook in 2011.
* Then Instagram in 2012.
* Went open source in May 2013.

React was born out of Facebook's frustration with the traditional MVC model and how..
  * Re-rendering something meant re-rendering everything (or just a lot).
  * That had negative implications on processing power and ultimately user experience, which at times became glitchy and laggy.

> If you want to get a taste of what React's all about, [here's an introduction from React.js Conf 2015](https://www.youtube.com/watch?v=KVZ-P-ZI6W4&feature=youtu.be&t=510). Recommend starting around the 8:35 mark and watching until 16:30.

### React in MVC

React can be thought of as the "Views" layer.

<details>
  <summary><strong>What is the role of a "view" in a front-end Javascript application?</strong></summary>

  > The visual template the user sees, often populated with data from our models.

</details>

React can be used agnostically throughout your stack. It's role is just to use data to render a UI. This means that React can also co-exist with other Javascript frameworks. Let the other frameworks handle the models and controllers, and have React sort out the views.

---

## Initial Setup (20 minutes / 0:25)

In order to create a new project and to get our development environment setup, we are going to use the Terminal command `create-react-app`. It will create a new folder in your current directory for the in-class application.

```bash
$ npm init react-app giphy-search
$ cd giphy-search
$ code .
$ npm run start
```

After running `$ npm run start`, we can view the app at `http://localhost:3000`

`create-react-app` provides us with all the necessary tools and configuration necessary to start writing React. `npm run start` refers to an included script that starts up the development server.

Along with installing the necessary dependencies such as React, ReactDom, Babel and Webpack, it creates an initial app skeleton that looks like this...

```bash
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

Most of the important files, which are primarily the ones where we will be working today, are in the `/src` directory.

---

### Stop / Catch Up / Investigate

Take some time and look at what's been generated. Specifically look in `App.js` and `index.js`. First, take a look at `index.js`.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

We're importing both `react` and `react-dom`. We use `react-dom` to render directly to an HTML node, in this case, its an element with an id of `root`. If you open up the `index.html` file in `/public` you'll see there is a `<div>` element with that id. 

`ReactDOM.render()` accepts two parameters, a `react element` (App) and a `container` in which the element should be rendered. This is pretty much how every single React application begins. 

You can ignore the bit about the `service-worker`. 

Now, lets take a look at `App.js`, which is being imported into `index.js` and rendered. 

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

#### What's that HTML doing in my Javascript?

Its not really HTML, its actually `JSX`. JSX is [a language that compiles to Javascipt](https://reactjs.org/docs/introducing-jsx.html) that allows us to write code that strongly resembles HTML. It is eventually compiled to lightweight JavaScript objects. React then uses these objects to build out a "Virtual DOM" -- more on that in just a bit.

> React can be written without JSX. If you want to learn more, [check out this blog post](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/).  

Let's break down the things we see here...

##### `class App`
This is the component we're creating. In this example, its the main `App` component.

##### `extends Component`
This is the React library class we inherit from to create our component definition. Remember, we don't really have have classes in JavaScript. This is a shorthand sytanx that allows our `App` component to inherit all the properties of a React component basic react component. 

##### `render()`
Every component has, at minimum, a render method. It generates a **Virtual DOM** node that will be added to the actual DOM.

##### `export default Search`
This exposes the Search class to other files which import from the App.js file. The `default` keyword means that any import that's name doesn't match a named export will automatically revert to this. Only one default is allowed per file.


**Virtual DOM? How is that different from the usual DOM?**

The Virtual DOM is a Javascript representation of the actual DOM.

* Because of that, React can keep track of changes in the actual DOM by comparing different instances of the Virtual DOM.
* React then isolates the changes between old and new instances of the Virtual DOM and then only updates the actual DOM with the necessary changes.
* By only making the "necessary changes," as opposed to re-rendering an entire view altogether, we save up on processing power.
* This is not unlike Git, with which you compare the difference -- or `diff` -- between two commits.

![Virtual DOM Diagram](https://docs.google.com/drawings/d/11ugBTwDkqn6p2n5Fkps1p3Elp8ZToIRzXzvM4LJMYaU/pub?w=543&h=229)

> If you're interested in learning more about the Virtual DOM, [check this video out](https://www.youtube.com/watch?v=-DX3vJiqxm4).

---

## Components

Traditionally we're used to a more MVC approach for separation of concerns. In React, we want to move towards more of a component-based separation of concerns. When taking a look at Facebook, you could think of each status post as a mini-component in React. And a list of those updates, is a component that contains several of those mini-components. You could take that one step further and think of the Facebook app, as one giant component with several components within it. (Things like the list of status updates, the friends list, the header, etc...)

### You Do: Identifying Components (10 minutes / 0:35)

> 5 minutes exercise. 5 minutes review.

Break into pairs and think about our Giphy Search application. Identify the visual "components". We suggest using markers to draw these out on your table! 

As you're drawing this out, think about the following questions...
* Where do you see "nested components"? Where do you not?
* Are there any components that share the same structure?
* Of these similar components, what is different about them?

---

### Our First Component (10 minutes / 0:45)

The basic unit you'll be working with in ReactJS is a **component**.
* It sounds like a simple word, but using "components" is a pretty different way of approaching web development.

* Components can be thought of as functional elements that takes in data and as a result, produce a dynamic UI.

Throughout class we have separated HTML, CSS and Javascript.
* With components, the lines between those three become a bit blurry.
* Instead, we organize our web apps according to small, reusable components that define their own content, presentation and behavior.

What does a component look like? Let's start by taking our Giphy Viewer search form from the handlebars example, and turning it into a component. 

To start, create a new directory inside of `src` called `components`. Create a new file inside of components called `search.js`. 

```js
// components/search.js

import React, {Component} from 'react'
import './search.css'

class Search extends Component {
  render () {
    return (
      <div className="search">
        <a className="home-link" href="/">Home</a>
        <form action="/" method="post" id="search-form" className="search-form form" >
          <input className="input __text" type="text" id="search" name="search"/>
          <input className="input __submit" type="submit" value="search"/>
        </form>
      </div>
    )
  }
}

export default Search
```

Lastly, move the `search.css` file from the `resources` directory into the `components` directory, so our styling gets updated. 

So we've created the template for our component. Now, lets add it to our main `App.js` file. 

```js
// App.js
import React, { Component } from 'react';
import Search from './components/search.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
      </div>
    );
  }
}

export default App;

```

We import the Search component and now we can use it just like it was an HTML tag, thanks to **JSX.**.

> **NOTE:** Whenever you use a self-closing tag in JSX, you **MUST** end it with a `/` like `<Search />` in the above example.

---

### Understanding Props in React (10 minutes / 0:55)

Our `Search` component is neat! We can make it customisable by passing in `props` to a component and using that to affect how the component is rendered. 

Lets say we only want to hide the home link if we are already on the home page.

First, we pass in data wherever we are rendering our component, in this case in `src/App.js`:

```js
// App.js
import React, { Component } from 'react';
import Search from './components/search.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search hideHomeLink={true}/>
      </div>
    );
  }
}
```

Then in our component definition, we have a reference to that data via as a property on the `props` object...

```js
import React, {Component} from 'react'
import './search.css'

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render () {
    // we have access to the prop that is passed in
    const hideHomeLink = this.props.hideHomeLink

    return (
      <div className="search">
        {!hideHomeLink &&
          <a className="home-link" href="/">Home</a>
        }
        <form className="search-form form" onSubmit={this.handleSubmit}>
          <input className="input __text" type="text" id="search" name="search"/>
          <input className="input __submit" type="submit" value="search"/>
        </form>
      </div>
    )
  }
}

export default Search
```

Notice that we don't use an `if` statement? In `JSX` we can't use `if` statements. We need to use a `ternary` operator, or a conditional operator like `&&` or `||`. We check to see if a value is true or false and then we can render different outcomes. In this case, if `homeHomeLink` is true, it will just skip rendering the link.

Lets take a look at some more [conditional rendering options.](https://reactjs.org/docs/conditional-rendering.html) Notice that you can definitely use if/else statements inside of the `render` function, *you just cant use them inside of the return statement that contains JSX*.

#### What are `.props`?

Properties! Every component has `.props`
* Properties are immutable. That is, they cannot be changed while your program is running. That means inside of your component definitions, you *should NOT be trying to modify props*.
* We define properties in development and pass them in as attributes to the JSX element in our `.render` method.

First we can pass multiple properties to our component when its rendered in `src/App.js`..

```js
...

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search hideHomeLink={true} buttonClass="__large"/>
      </div>
    );
  }
}

...
```

Then in our component definition we have access to both values...

```js
import React, {Component} from 'react'
import './search.css'

class Search extends Component {
  render () {
    // here, we are destructuring the props object. We give buttonClass a default of "normal". 
    // if the component receives buttonClass as a prop, it will override the value. 
    const {hideHomeLink, buttonClass = 'normal'} = this.props
    return (
      <div className="search">
        {!hideHomeLink &&
          <a className="home-link" href="/">Home</a>
        }
        <form action="/" method="post" id="search-form" className="search-form form" >
          <input className="input __text" type="text" id="search" name="search"/>
          <input className={`input __submit ${buttonClass}`} type="submit" value="search"/>
        </form>
      </div>
    )
  }
}

export default Search

```

Take a look at the `className` on the button that we updated. Its no longer a string. Props can be any data type, but if you are using JavaScript expressions you need to wrap everything in curly braces.

[You can read more about props and components here.](https://reactjs.org/docs/components-and-props.html)

## State and Events (10 minutes / 2:10)

So we know about React properties, and how they relate to our component's data.
* The thing is, `props` represent data that will be the same every time our component is rendered. What about data in our application that may change depending on user action?
* That's where `state` comes in..

Values stored in a component's state are mutable attributes.
* Like properties, we can access state values using `this.state.val`
* Setting up and modifying state is not as straightforward as properties. It involves explicitly declaring the mutation, and then defining methods to define how to update our state...

Lets implement state in our earlier `Search` example

```js
class Search extends Component {
  // when our component is initialized,
  // our constructor function is called
  constructor () {
    // make call to parent class' (Component) constructor. We have to do this in the 
    // constructor function before we can use the `this` keyword. More info here:
    //  https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e
    super()
    // define an initial state

    this.state = {
      searchText: null
    }
  }

  render () {
    ...
  }
}
```

Ok, we set an initial state. But how do we go about changing it?
* We need to set up some sort of event to change our `searchText`.

Take a look at how this event is implemented. We use an attribute called `onChange` to define what happens when we change the value of an input field. The callback function for `handleChange` invokes `setState` which then updates the state of our component. 

```js
class Search extends Component {
  ...

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  render () {
    // we have access to the prop that is passed in
    const {hideHomeLink, buttonClass = 'normal'} = this.props

    return (
      <div className="search">
        {hideHomeLink ? null :
          <a className="home-link" href="/">Home</a>
        }

        <form className="search-form form">
          <input className="input __text" onChange={this.handleChange}/>
          <input className={`input __submit ${this.props.buttonClass}`} type="submit" value="search"/>
        </form>
      </div>
    )
  }
}
```

Whenever we run `.setState`, our component mimics a diff against the current DOM, and compares the Virtual DOM node with the updated state to the current DOM.

* Only replaces the current DOM with parts that have changed.

Now, we need to create an event to handle the form Submission.

```js
class Search extends Component {
  ...

  // we add a function to handle the submission of the search form
  handleSubmit = (e) => {
    e.preventDefault()
    const searchText = this.state.searchText
    console.log(searchText)
  }

  handleChange = (e) => {
    const val = e.target.value

    this.setState({
      searchText: val
    })
  }

  render () {
    // we have access to the prop that is passed in
    const hideHomeLink = this.props.hideHomeLink
    const buttonClass = this.props.buttonClass || 'normal'

    return (
      <div className="search">
        {hideHomeLink ? null :
          <a className="home-link" href="/">Home</a>
        }

        <form className="search-form form" onSubmit={this.handleSubmit}>
          <input className="input __text" onChange={this.handleChange}/>
          <input className={`input __submit ${this.props.buttonClass}`} type="submit" value="search"/>
        </form>
      </div>
    )
  }
}
```

### Wiring Up The API Call

Now we've got the form submission working, we need to use it so call the Giphy API. To do this, we'll use the new `Fetch API` available in most modern browsers. Its like `XMLTTPRequest` but much nicer. [Lets take a look at some docs.](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Lets modify the `handleSubmit` function in the `Search` component.

```js
//components/search.js
...
  handleSubmit = e => {
    e.preventDefault()
    const key = 'XvPOxKdQreOgBQ9YKlivmoMHS3aQGJnH' 
    const searchText = this.state.searchText
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchText}`

    fetch(url).then(response => {
      return response.json()
    }).then(response => {
      console.log(response)
    })
  }
...
```

Great, we get a response from Giphy. But, now we have a problem. We want to render these gifs, but we probably don't want to render them inside the search component. The `Search` component's job is to handle the form interaction and call the API, not to render the results. We want to create a `List` component that will take an array of gifs and render them. The `List` component is going to be a `sibling` to `Search`, because they will both be rendered inside the `App`. So, the problem now becomes how do we pass the data from the Search component into the List component. Lets create the `List` component first to help illustrate the problem.

```js
//components/list.js
import React from 'react'
import Gif from './gif.js'

const GifList = props => {
  return (
    <div className="page">
      <div className="gif-list">
        {props.gifs.map(gif => {
          return (
            <Gif gif={gif}/>
          )
        })}
      </div>
    </div>
  )
}

export default GifList
```

Woah, this looks a little bit different than the Search component. There is no `class`, and no `render` function. In React, this type of component is called a `functional component`. Functional components are just functions that return JSX. *THEY DONT HAVE ANY STATE*. They just accept props and render stuff.

Also, take a minute to compare this to the `gifList` handlebars template from last class. Its pretty similar!

Now, we need to create a `Gif` component, which is the equivalent to the partial we used in handlebars.

```js
//components/gif.js
import React from 'react'

const Gif = props => {
  const {gif} = props
  return (
    <div className="gif">
      <img src={gif.images.fixed_height.url} alt=""/>
      <div className="meta">
        <div className="meta-item">
          Rating: {gif.rating}
        </div>
        <div className="meta-item">
          <a href={gif.url}>link</a>
        </div>
      </div>
    </div>
  )
}
export default Gif
```

Again, this looks almost exactly like the handlebars partial!

### Sending Data To Sibling Components Through The Parent

So, we have a `Search` component that gets data, and we have a `GifList` component that can render it. Lets update our `App` component to include the `GifList`.

```js
// App.js
import React, { Component } from 'react';
import Search from './components/search.js'
import GifList from './components/list.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search hideHomeLink={true} buttonClass="__large"/>

        <GifList gifs={[]}/>
      </div>
    )
  }
}

export default App;
```

Here' we're just passing in an empty array into GifList, but we'll need to be able to pass in the data from the `Search` component. Knowing what we've learned, how do you think we might be able to achieve this? 

We can start by adding some state to our `App` component that will store the gifs from our search result.

```js
//App.js
...
class App extends Component {
  constructor(){
    super()
    this.state = {
      gifs: []
    }
  }
  render() {
    return (
      <div className="App">
        <Search hideHomeLink={true} buttonClass="__large"/>

        <GifList gifs={this.state.gifs}/>
      </div>
    )
  }
}
...
```

Now, the magic. We can create a function in `App` that will update the state of `App` and then pass that function into `Search`. Lets take a look.

```js
//App.js
...
class App extends Component {
  constructor(){
    super()
    this.state = {
      gifs: []
    }
  }

  // We will pass this function into our Search component. 
  // When the result of our API comes back, this function will
  // get called, and update parent state. 
  updateParentState = gifs => {
    this.setState({
      gifs: gifs
    })
  }

  render() {
    return (
      <div className="App">
        <Search 
          hideHomeLink={true}
          buttonClass="__large"
          updateParentState={this.updateParentState}/>

        <GifList gifs={this.state.gifs}/>
      </div>
    )
  }
}
...
```

This works because the `this` keyword in `updateParentState` is always going to refer to the `App` component, even if its called from the `Search` component. This is what encapsulation means!

Now, we just need to update callback in the `fetch` thats made from the `handleSubmit` function in the `Search` component.

```js
//components/search.js
...
fetch(url).then(response => {
  return response.json()
}).then(response => {
  console.log(response)
  // we call the function that was passed into it from the parent
  this.props.updateParentState(response.data)
})
...
```

It works! There's one thing we forgot to do. Lets open up our developer tools in Chrome and see if we have any errors. 

```bash
index.js:1452 Warning: Each child in an array or iterator should have a unique "key" prop.

Check the render method of `GifList`. See https://fb.me/react-warning-keys for more information.
    in Gif (at list.js:11)
    in GifList (at App.js:31)
    in div (at App.js:25)
    in App (at src/index.js:7)
```

We're getting an error saying that we need to add a `key` prop to each child element that gets rendered in our List. Lets go back to `GifList` and make the change.

```js
//components/list.js
...
const GifList = props => {
  console.log(props)
  return (
    <div className="page">
      <div className="gif-list">
        {props.gifs.map(gif => {
          return (
            <Gif key={gif.id} gif={gif}/>
          )
        })}
      </div>
    </div>
  )
}
...
```

Here, we're adding a `key` prop to each `Gif` component. [`Keys`](https://reactjs.org/docs/lists-and-keys.html#keys) help react identify which items have changes and need to be updated. `Keys` should be unique. 

## Closing

### What's Next?

Next class, we'll continue with React by hooking up our Giphy-Search server and rendering results from the Database.


---

## Additional Reading

* [Official React Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [React Forms](https://reactjs.org/docs/forms.html)
* [React Events](https://reactjs.org/docs/events.html)
* [React Router](https://github.com/ReactTraining/react-router)
* [API/Axios](https://www.npmjs.com/package/axios)
* [Tyler McGinnis' React Fundamentals](https://tylermcginnis.com/courses/react-fundamentals/)
