import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'
import EventEmitter from 'events'

class App extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
      Router.addListener('popstate', (route) => {
        console.log('popstate -> Should render: ', route.params) 
      })
      Router.addListener('pushstate', (route) => {
        console.log('pushstate -> Should render: ', route.params) 
      })
    }

    render(){
        return (
          <Excel headers={ table.headers } initialData={ table.data }/>
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

      this.emit('popstate', state)
    })

    document.querySelectorAll('a.routed').forEach((a) => a.addEventListener('click', (e)=> {
      e.preventDefault()
      let previousState = this.queryStringToJSON()
      window.history.pushState(previousState, null, e.target.getAttribute('href'))
      let state = this.queryStringToJSON()
      this.get(location.pathname).call(null, state.params)

      this.emit('pushstate', state)
    }))

    window.addEventListener('load', (e) => {
      this.emit('pushstate', this.queryStringToJSON())
    })
  },

  add(route, fn){
    if (!this.initiated) this.initiated = true;
    this.routes.push({ route, fn })
  },

  get(route){
    return this.routes.filter( r => r.route == route)[0].fn
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
