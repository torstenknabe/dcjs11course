# React.js Cont

## Learning Objectives

* Understand the relationship between a React application and an express server
* Using Axios, create an API from our existing Giphy Search express server
* In React, make requests to our new API and display the results

---

## Understand the relationship between a React application and an express server

In the last class, we used `create-react-app` to generate a new directory for us that contained our React application. When we run `npm run start` from the new directory, `create-react-app` starts up a local development server for us and opens a web browser to localhost:3000. This development server is listening for changes in our React code - when it detects a change it re-bundles our code and delivers it to the web browser automatically and the page updates with our changes. This is a really nice development feature!

In our handlebars-express example, we created our own express server that handled rendering HTML for us. Our `server.js` file used `handlebars-express` as a templating engine. When requests were made to our server from a browser, the server would get data from the Giphy API and provide it to a handlebars template the rendered HTML as a string and then sent that back to our browsers to render. 

With our React application, we need a way of requesting the data from Giphy and displaying it. We can either make the Giphy API request directly from our React application (so the request is made from the client), or we can make a call to our own server (via an API) and have our own server make the API call to Giphy. Its good practice to separate out the business logic (which is getting the data from Giphy) from the front-end, which we can accomplish by making our own API.

To be clear, our React application will be making an HTTP request to our express server which in turn will make an HTTP request to Giphy to get the data. The downside of this is that it requires an extra HTTP request, but the upside is that we can apply different front-end applications to our data layer make it more reuseable. 

We're going to now be managing two different applications (our React app and our API app). For class purposes, we're separating these into `client` and `server` directories. In a production environment, these applications would really be their own git repositories with their own version numbers.


## Creating The API

In our `server` directory, we'll need to modify the `server.js` file to remove all the handlebars stuff. We'll also need to make a `GET` handler for our search endpoint. Lets start by cleaning up the file by removing what we don't need. 

```js
// server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api.js')
const db = require('./db.js')
const app = express()

// we need to allow Cross Domain requests. Our client is at localhost:3000 but our server is
// localhost:4000. This is technicaly a 'cross-domain' reuqest. By defualt, these aren't allowed.
// We can whitelist certain origins and allow them to acess our API.
const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))

app.get('/', (req, res) => {
  db.models.Search.find({})
    .limit(10)
    .sort({date: -1})
    .then(results => {
      res.send(results)
    })
})

app.get('/:search', (req, res) => {
  const searchText = req.params.search
  api.searchGifs(searchText).then(r => {
    const data = JSON.parse(r).data
    res.send(data)
  })
})

app.post('/', (req, res) => {
  const searchText = req.body.searchText
  db.models.Search.create({
    text: searchText,
    date: new Date()
  }).then(r => {
    res.send(r)
  })
})

app.listen(4000, () => {
  console.log('listening on port 4000')
})

```
We've removed all the handlebars stuff and modified the `GET` request to `/:search`. Also, notice that instead of using `res.render()` to render a view, we are using `res.send(data)` . That's because our server is no longer responsible for rendering the view. Our server simply prodives the data it is requested, just like an API does!

Sweet, now from our `server` directory we can run `rpm run start` and our server will be listening on port 4000. 

## Consuming the API

Now we're moving into client-side code inside of our React app. We need to create an reuseable way to call our new API. Lets create a new file called `api.js` in our `client` directory.

In this file, we'll handle making all of the HTTP requests to our API (express server). Remember, our API server is listening on port 4000 and our development server is listening on port 3000. 

We're going to use a library called [axios](https://github.com/axios/axios). Axios is a promise based HTTP client for the browser and node.js. Its pretty commonly used industry-wide.

Lets install the dependency from our `client` directory.

```
$ npm install --save axios
```

Now, lets create an `api.js` file in our `client/src` directory. 

```js
// client/src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

function searchGifs (searchText) {
  return api.get(`/${searchText}`).then(result => {
    return result.data
  })
}

function getSearchResults() {
  return api.get(`/`).then(result => {
    return result.data
  })
}

export {api, searchGifs, getSearchResults}
```

We import `axios` and create a new connection to our express server. We can now make HTTP requests to our express server easily! We create the `searchGifs` and `getSearchResults` functions, each of which make a get request to our enpoint and returns a promise. Now in our React component we can call searchGifs and render them!

In our `search.js` component we can now call searchGifs when the form is submitted.

First, we'll need to import `searchGifs` then we'll need to modify the `handleSubmit` function.

```js
// client/src/components/search.js

import React, {Component} from 'react'
import {searchGifs} from '../api.js'
import './search.css'

class Search extends Component {

  constructor () {
    super()
    this.state = {
      searchText: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchText = this.state.searchText

    // call our new api handler that we import from axios
    searchGifs(searchText).then(gifs => {
      // well update the state of our parent component with the result of our api
      this.props.updateParentState(gifs)
    })
  }
  ...
}

export default Search

```

## Routing

In our handlebars example, we had different routes that rendered different views. This was accomplished on the server-side by rendering HTML from the handlebars files and returning that HTML as a string to the client. 

In our React application, we can also do routing! But this routing is done all on the client-side. We're going to implement our client-side routes by using [React Router](https://reacttraining.com/react-router/web/guides/quick-start).

First, lets add the dependency to our client application.

```bash
npm install --save react-router-dom
```

Next, lets add some routing components to our `App.js` file.

```js
//App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from './pages/home.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact 
              path="/"
              component={Home}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
```

Lets look at these changes. Previously, we were rendering the `Search` component directly inside the application. Now, we're using the `<Router>` component along side the `<Route>` component to render a `Home` component, which represents our homepage.

We've completely removed state from this component as well. Now, when a user makes a search, it will just redirect to the appropriate route, which we'll add later.

Lets' build out the `Home` component. Create a new directory called `pages` inside of `src`, and create a `home.js` file inside of the new directory.

```js
//pages/home.js
import React, {Component} from 'react'
import Search from "../components/search"

class Home extends Component{
  render(){
    return (
    <div className="page home">
       <Search hideHomeLink={true}
          buttonClass="__large"
          updateParentState={this.props.updateAppState}
        />
    </div>
    )
  }
}

export default Home
```

Cool, we're just moving the search component into the homepage component for now. But lets remember, our homepage shouldn't return a list of Gifs, it should return a list of previous searchs that we've made. Lets add some logic so that when the homepage mounts, it gets some data.

First, lets add a constructor. We'll need to use some state for this component. After the results of our API come back, we're going to update this component's state.

```js
//pages/home.js

...
class Home extends Component{
  constructor(){
    super()
    this.state = {
      searchResults: []
    }
  }
...

```

Next, lets create a function to handle when the component mounts. When it mounts, we'll go fetch some data. We'll use `componentDidMount`, which is a lifecycle method of React.Component. [Read more about those here.](https://reactjs.org/docs/react-component.html#componentdidmount)

```js
import {getSearchResults} from "../api"

...
// componentDidMount is a life-cycle method thats part of React.Component.
componentDidMount(){
  getSearchResults().then(results => {
    this.setState({
      searchResults: results
    }) 
  })
}

...

```

Next, we'll need to render the list of results, so lets update the render function.

```js
...
render(){
    return (
    <div className="page home">
       <Search hideHomeLink={true}
          buttonClass="__large"
          updateParentState={this.props.updateAppState}
        />

        <ul className="search-list">
          {this.state.searchResults.map(result => {
            console.log(result)
            return (
              <li className="js-search-result" key={result.id}>
                <Link to={`/${result.text}`}>
                  {result.text} - {result.date}
                </Link>
              </li>
            )
          })}
        </ul>
    </div>
    )
  }
}
...
```
We've created a `<ul>` that loops through each of our results and renders an `<li>` component. Notice that we aren't using any `<a>` tags for the link to the result. We're using `react-router`'s `<Link>` component. It renders as an anchor tag, but the Link component will also tell our Router to update as well. 

Lets try clicking on a link. What happens?

The URL updates, but nothing else renders. That's because we haven't added a route for it yet. 

Lets update the `App.js` file to handle a new route.

```js
// App.js
import Result from './pages/result.js'

...
render() {
  return (
    <div className="App">
      <Router>
        <Route 
          exact
          path="/"
          render={() => <Home updateAppState={this.updateParentState}/>}
        />
        <Route 
          path="/:searchText"
          component={Result}
        />
      </Router>
    </div>
  )
}
...
```

Here, we are creating a new route and telling it to render the Result component. Lets create the Reult page.

```js
// pages/result.js
import React, {Component} from 'react'
import {Link} from "react-router-dom"
import GifList from '../components/list'
import {searchGifs} from "../api"

class Result extends Component{
  constructor(){
    super()
    this.state = {
      gifs: []
    }
  }

  componentDidMount(){
    console.log(this.props)
    searchGifs(this.props.match.params.searchText).then(results => {
      this.setState({
        gifs: results
      }) 
    })
  }

  render(){
    return (
      <div className="page results">
        <Link to="/">Home</Link>
         <GifList gifs={this.state.gifs}/>
      </div>
    )
  }
}

export default Result
```

Its a similar setup to the Home page. Instead of getting the results from our Database, we're making a call to Giphy's API and then updating component state. When state is updated, the new gifs will be passed to `GifList`. Note in the `componentDidMount` function that were are using `this.props.match.params`. Lets take a look in the console to see what this component's props look like. 

We can see `history`, `location`, and `match`. There are all props that are passed down to this component from the React Router. 

Lastly, we'll need to update our `Search` component again, because instead of updating parent state, we just want to redirect to a new route, and let the `Result` component do the searching. We just need to update the `handleSubmit` function.

```js
// components/search
...
handleSubmit = e => {
  e.preventDefault()
  console.log(this.props)
  const searchText = this.state.searchText
  this.props.history.push({
    pathname: `/${searchText}`
  })
}
...
```

Lets try it out. What happens? We get a `cannot read property 'push' of undefined`. Why is that? Lets look at this component's props.

Hmmm, none of the props from `react router` are there. That's because thos props are only handed down to the component that was rendered from the `Route`. In this case, those props are only handed down to `Home`. We could pass the props from `Home` into `Search`, but that's pretty ugly. Instead, React Router has a `with-router` higher-order-component that we can use. [Lets look at the documentation](https://reacttraining.com/react-router/web/api/withRouter).

```js
import {withRouter} from 'react-router'

...

export default withRouter(Search)
```

Great, now it works! There is only one more problem that I see. When we click back to home, our Search Result list doesn't show the new search we made. Why is that? 

Because we haven't wired up the `Search` component to hit the `POST '/'` endpoint of our server, which creates a new item in our MongoDB.

First, lets update our `api.js` to add the new client-side endpoint.

```js
// api.js
function createSearch(searchText){
  return api.post('/', {searchText: searchText})
}

export {api, searchGifs, getSearchResults, createSearch}
```

Here we are going to pass in the result of our form submission to the `POST` request thats made to our server application. Now, in the `Search` components, lets update the `handleSubmit` function again so that it calls the api.

```js
// components/search.js
import {createSearch} from '../api'

...
handleSubmit = e => {
  e.preventDefault()
  const searchText = this.state.searchText
  createSearch(searchText).then(r => {
    this.props.history.push({
      pathname: `/${searchText}`
    })
  })
}
...
```

That's it, we're done!

## Closing

### What's Next?

* [Overview of JavaScript Testing](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)
* [Jest Testing Library](https://jestjs.io/)
* [Testing React with Enzyme](https://airbnb.io/enzyme/)
