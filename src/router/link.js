import React, { Component } from 'react'
import Router from './router'

class Link extends Component {

  constructor(props){
    super(props)
    this._click = this._click.bind(this)
  }

  _click(evt){
    evt.preventDefault()
    // Router.goTo(evt.target.getAttribute('href')) 
  }

  render(){
    let cssClasses = "routed " + (this.props.className ? this.props.className : "")
    return (<a className={cssClasses} href={ this.props.to } 
      onClick={(e) => this._click}>
        { this.props.children }</a>
    )
  }
}

Link.PropTypes = {
  to: React.PropTypes.string.isRequired
}

export default Link
