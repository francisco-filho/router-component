import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'
import Router, { Link } from '../router/router'

class App extends Component {
    constructor(props){
        super(props)
        this._routing = this._routing.bind(this)
        this.state = { children: null }

        Router.add('/', (e) => {
          if (e.query)
            console.info('Chamando Actions.updateResults()', e.query)
        }) 
    }

    _routing(params){
      let hasQuery = params && params.query
      this.setState({ query: hasQuery ? params.query : hasQuery} ) 

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
          <div className="row">
            <Link to="?query=novidades especiais" className="btn btn-default">Novo</Link> 
            <a className="btn btn-info" onClick={()=> Router.goTo('?query=go_to')}>GoTo /?query=go_to</a>
          </div>
        { (this.state.query) ?
            <Excel 
            headers={ table.headers } 
            initialData={ table.data } i
            query={JSON.stringify(this.state.query)}/>
          : <h1>Index page</h1>
          
        }
        </div>
      )
    }
}

render(<App/>, document.getElementById('app'))
