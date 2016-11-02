import React, { Component } from 'react'

class Excel extends Component {
  constructor(props){
    super(props)
    this.state = { 
      data:  this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false
    }
    this._sort = this._sort.bind(this)
    this._search = this._search.bind(this)
    this._save = this._save.bind(this)
    this._showEditor = this._showEditor.bind(this)
  }

  _sort(evt){
    console.log('sorting')
    let sortby = evt.target.cellIndex,
        data = this.state.data.slice(),
        descending = this.state.sortby === sortby && !this.state.descending

    data.sort((a, b) => {
      return a[sortby ] > b[sortby ] ? (descending ? -1 : 1) : (descending ? 1 : -1) 
    })
    this.setState({ data, sortby, descending })
  }


  _showEditor(e){
    this.setState({
      edit: {
        row: parseInt(e.target.parentNode.getAttribute('data-row')),
        cell: e.target.cellIndex
      } 
    })
  }

  _save(evt){
    let data = this.state.data.slice()
    let input = evt.target.firstChild
    data[this.state.edit.row][this.state.edit.cell] = input.value
    this.setState({ data, edit: null })
    evt.preventDefault()
  }

  _renderToolbar(){
    return <div><button onClick={ this._toggleSearch.bind(this) }>Search</button></div>
  }

  _search(evt){
    let data = this.state.data.slice().filter((row)=> {
  return row[evt.target.getAttribute('data-index')].indexOf(evt.target.value) > -1
    })
    this.setState({ data })
  }

  _renderSearch(){
    return (<tr>
      { this.props.headers.map((td, idx)=> { return (<td key={ idx }>
          <input type="text" defaultValue="" data-index={idx} onChange={ evt => this._search(evt)}/>
        </td>) }
      )}
    </tr>)
  }

  _toggleSearch(){
    console.log('git gutter')
    this.setState({
      search: !this.state.search,
      data: this.props.initialData
    }) 
  }

  render(){
    let edit = this.state.edit
    return (
      <div>
      { this._renderToolbar() }
      <table className="table"><thead><tr>
          { this.props.headers.map((h, idx) => {
              if (this.state.sortby == idx){
                h += this.state.descending ? '\u2191' : '\u2193'
              }
              return <th key={idx} onClick={evt => this._sort(evt)}>{ h }</th>
            })
          } 
      </tr></thead>
      <tbody>{(this.state.search == true) ?  this._renderSearch() : null }
        { this.state.data.map((row, idx) => {
          return <tr key={ idx } data-row={ idx } onDoubleClick={evt => this._showEditor(evt)}>
            {
              row.map((td, idxt) => {
                if (edit && edit.row == idx && edit.cell == idxt)
                return <td key={idxt}><form onSubmit={ evt => this._save(evt) }>
                  <input type="text" defaultValue={ td }/></form></td>
                else
                  return <td key={idxt}> { td }</td>
              })
            }
          </tr>
        })
      }</tbody>
      </table>
    </div>
    ) 
  }
}

Excel.propTypes = {
  headers: React.PropTypes.arrayOf( React.PropTypes.string ),
  initialData: React.PropTypes.arrayOf( React.PropTypes.arrayOf( React.PropTypes.string))
}

export default Excel
