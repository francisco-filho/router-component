### History API

- window.history.back()
- window.history.forward()
- window.history.go(-2)
- window.history.got(2)

- window.history.pushState({}, "title", "?state=hello")

- window.addEventListener("popstate", ()=>{})

<App router=<Router/>>
  <A/>
</App>

App {
  mixins: [ Router ]

  routes: {
    '/' : <Main/>,
    '/?query=a' : <Search/>
  }

  render(){
    { this.state.route.component }
    { this.state.route.query }
  }
}

'/'
- on popstate /
    - find route or default
    - setState component of route
    - setState query of route
- push state needs real endpoint? 
    
