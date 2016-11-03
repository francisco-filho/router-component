import React, { Component } from 'react'
import { EventEmitter } from 'events'

const Router = Object.assign({}, EventEmitter.prototype, {
  initiated: false, 
  defaultRoute: '/',
  routes: [], 

  init(){
    this.initiated = true

    window.addEventListener('popstate', (e)=> {
      let state = this.queryStringToJSON()
      let route = this.get(location.pathname)
      if (route && route.fn)
        route.fn.call(null, state.params)
      this.emit('routechanged', state)
    })

    document.body.addEventListener('click', (e)=>{
      if (e.target.tagName === 'A' && e.target.classList.contains('routed')){
        e.preventDefault()
        let previousState = this.queryStringToJSON()
        window.history.pushState(previousState, null, e.target.getAttribute('href'))
        this.executeRoute(previousState)
      }
    })

    window.addEventListener('DOMContentLoaded', (e) => {
      let route = this.get(location.pathname)
      if (!route){
        this.redirectTo(this.defaultRoute)  
        return
      }
      this.emit('routechanged', this.queryStringToJSON())
    })
  },

  setDefault(route){
    this.defaultRoute = route
  },

  executeRoute(oldState){
    let route = this.get(location.pathname)
    if (!route){
      console.debug(`Rota inválida [ ${location.pathname} ], crie novas rotas com Route.add().`)
      this.redirectTo(this.defaultRoute)  
      return
    }

    let state = this.queryStringToJSON()
    if (oldState && oldState.route === state.route){
      if (state.params && oldState.params &&
        this.isShallowEqual(oldState.params, state.params)){
        return;
      }
    }

    if (route && route.fn)
      route.fn.call(null, state.params)

    this.emit('routechanged', state)
  },

  goTo(uri){
    window.history.pushState({}, null, uri)
    this.executeRoute()
  },

  add(route, fn){
    if (!this.initiated) this.init()
    this.routes.push({ route, fn: fn ? fn : undefined })
    return this
  },

  get(route){
    return this.routes.find( r => r.route === route )
  },

  redirectTo(route){
    window.history.pushState({}, null, route)
    let state = this.queryStringToJSON()
    if (route.fn)
      route.fn.call(null, state.params)
    this.emit('routechanged', state)
  },

  queryStringToJSON(){
    let json = { route: window.location.pathname, params: {}}
    let search = location.href.split('?')[1]
    search && search.replace('/\?','')
      .split('&')
      .forEach(q => {
        let fragments = q.split('=')
        let key = decodeURIComponent(fragments[0])
        json['params'][key] = key !== '/' ? decodeURIComponent(fragments[1]) : null
     })
     return json
   },
   
  isShallowEqual(a, b) {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      // checa primeiro quantidade de parametros
      if (aProps.length != bProps.length) {
          return false;
      }
      // checa os valores
      for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if (a[propName] !== b[propName]) {
              return false;
          }
      }
      return true;
  }
})


export class Link extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let cssClasses = "routed " + (this.props.className ? this.props.className : "")
    return (<a className={cssClasses} href={ this.props.to }>{ this.props.children }</a>
    )
  }
}

Link.PropTypes = {
  to: React.PropTypes.string.isRequired
}

export default Router
