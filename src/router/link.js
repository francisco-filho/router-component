import React, { Component } from 'react'
import Router from './router'

class Link extends Component {
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

export default Link
