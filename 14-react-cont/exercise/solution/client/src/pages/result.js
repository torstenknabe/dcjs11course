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