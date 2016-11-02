import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'
import EventEmitter from 'events'

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
        children: <Excel headers={ table.headers } initialData={ table.data }/>
      })
      } else {
        this.setState({ children: <h1>Index Page</h1> })
      }
    }

    componentDidMount(){
      Router.addListener('routechanged', (route) => {
        console.log('routechanged-> Should render: ', route.params) 
        this._routing(route.params) 
      })
    }

    render(){
    return (<div><h1>Router</h1>
        { this.state.children }
      </div>
      )
    }
}

window.Router = Object.assign({}, EventEmitter.prototype, {
  initiated: false, 
  routes: [],

  init(){
    this.initiated = true

    window.addEventListener('popstate', (e)=> {
      let state = this.queryStringToJSON()
      this.get(location.pathname).call(null, state.params)

      this.emit('routechanged', state)
    })

    document.querySelectorAll('a.routed').forEach((a) => a.addEventListener('click', (e)=> {
      e.preventDefault()
      let previousState = this.queryStringToJSON()
      window.history.pushState(previousState, null, e.target.getAttribute('href'))

      let state = this.queryStringToJSON()
      let route = this.get(location.pathname)
      if (route.fn)
        route.fn.call(null, state.params)

      this.emit('routechanged', state)
    }))

    window.addEventListener('load', (e) => {
      this.emit('pushstate', this.queryStringToJSON())
    })
  },

  add(route, fn){
    if (!this.initiated) this.init()
    this.routes.push({ route, fn: fn ? fn : undefined })
  },

  get(route){
    return this.routes.find( r => r.route == route )
  },

  queryStringToJSON(){
    let json = { route: window.location.pathname, params: {}}
    window.location.href.replace(window.location.origin,'')
      .replace('/\?','')
      .split('&')
      .forEach(q => {
        let fragments = q.split('=')
        let key = decodeURIComponent(fragments[0])
        json['params'][key] = key !== '/' ? decodeURIComponent(fragments[1]) : null
     })
     return json
  }
})

render(<App/>, document.getElementById('app'))
