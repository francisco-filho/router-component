import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'
import Router, { Link } from '../router/router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends Component {
    constructor(props){
        super(props)
        this._routing = this._routing.bind(this)
        this.state = { children: null }

        Router
          .add('/home/', (e) => {
            if (e.query)
              console.info('Chamando Actions.updateResults()', e.query)
          })
          .setDefault('/home/')
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
          <h1 className="row">Router</h1>
          <div className="row">
            <a className="routed btn btn-primary" href="/">Index</a>
            <a className="routed btn btn-default" href="?query=a&q2=c">query a</a>
            <a className="routed btn btn-default" href="?query=b">query b</a>
            <a className="routed btn btn-danger" href="/query/c">Inválido</a>
            <a className="not-routed btn btn-warning" href="/">Link sem rota</a>
            <Link to="?query=novidades especiais" className="btn btn-default">Novo</Link> 
            <a className="btn btn-info" onClick={()=> Router.goTo('?query=go_to')}>GoTo /?query=go_to</a>
          </div>
        <ReactCSSTransitionGroup
          transitionName="route-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        { (this.state.query) ?
            <Excel 
            headers={ table.headers } 
            initialData={ table.data } 
            query={JSON.stringify(this.state.query)}/>
          : <IndexPage message="Hello React"/>          
        }
        </ReactCSSTransitionGroup>
        </div>
      )
    }
}

function IndexPage(props){
  return <h1>Index page { !!props && props.message}</h1>
}

render(<App/>, document.getElementById('app'))
