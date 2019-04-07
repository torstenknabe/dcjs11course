import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {searchGifs, createSearch} from "../api.js"
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
    createSearch(this.state.searchText).then(() => {
      this.props.history.push({
        pathname: `/${this.state.searchText}`
      })
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

export default withRouter(Search)