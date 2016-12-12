import React from 'react'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div>{this.data}</div>)
  }
}
