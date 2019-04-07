import React, {Component} from 'react'
import {createSearch} from '../api'
import {withRouter} from 'react-router'
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
    const searchText = this.state.searchText
    createSearch(searchText).then(r => {
      this.props.history.push({
        pathname: `/${searchText}`
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