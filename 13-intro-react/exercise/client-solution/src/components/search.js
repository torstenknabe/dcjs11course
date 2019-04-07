import React, {Component} from 'react'
import './search.css'

class Search extends Component {
  constructor(){
    super()
    this.state = {
      searchText: null
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const key = 'XvPOxKdQreOgBQ9YKlivmoMHS3aQGJnH' 
    const searchText = this.state.searchText
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchText}`

    fetch(url).then(response => {
      return response.json()
    }).then(response => {
      console.log(response)
      this.props.updateParentState(response.data)
    })
  }

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  render () {
    const {hideHomeLink, buttonClass = 'normal'} = this.props
    return (
      <div className="search">
        {!hideHomeLink &&
          <a className="home-link" href="/">Home</a>
        }
        <form action="/" method="post" id="search-form" className="search-form form" onSubmit={this.handleSubmit} >
          <input className="input __text" onChange={this.handleChange}/>
          <input className={`input __submit ${buttonClass}`} type="submit" value="search"/>
        </form>
      </div>
    )
  }
}

export default Search