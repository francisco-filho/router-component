import React, { Component } from 'react'
import { render } from 'react-dom'
import table from './data'
import Excel from './excel'

class App extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
          <Excel headers={ table.headers } initialData={ table.data }/>
        )
    }
}

render(<App/>, document.getElementById('app'))
