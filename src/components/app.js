import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'
import Router from './router'

class App extends Component {
    constructor(props){
        super(props)
        this._routing = this._routing.bind(this)
        this.state = { children: null }

        Router.add('/') 
    }

    _routing(params){
      if (params.query){
      this.setState({ 
        children: <Excel headers={ table.headers } 
          initialData={ table.data } i
          query={JSON.stringify(params)}/>
      })
      } else {
        this.setState({ children: <h1>Index Page</h1> })
      }
    }

    componentDidMount(){
      Router.addListener('routechanged', (route) => {
        this._routing(route.params) 
      })
    }

    render(){
      return (
        <div>
          <h1>Router</h1>
          { this.state.children }
        </div>
      )
    }
}

render(<App/>, document.getElementById('app'))
