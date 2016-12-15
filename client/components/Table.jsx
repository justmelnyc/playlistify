import React, { PropTypes } from 'react'

import TableHeader from './TableHeader'

const propTypes = {
  data: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func,
  sort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
  })
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageStart: 0,
      pageEnd: 10,
      pageInterval: 10
    }
  }

  buildTableItems(datum) {
    const keys = Object.keys(datum)
    return keys.map((key, i) => <div className="Table-item" key={key}>{datum[key].name}</div>)
  }

  getKeys() {
    return this.props.data[0] ? Object.keys(this.props.data[0]) : []
  }

  currentPagination() {
    const {data} = this.props
    return data.slice(this.state.pageStart, this.state.pageEnd)
  }

  nextPage() {
    this.setState((prevState) => {
      const pageStart = prevState.pageEnd
      const pageEnd = pageStart + this.state.pageInterval

      if (pageEnd <= this.props.data.length) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }
    })
  }

  prevPage() {
    this.setState((prevState) => {
      const pageEnd = prevState.pageStart
      const pageStart = prevState.pageStart - this.state.pageInterval

      if (pageStart >= 0) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }

    })
  }

  render() {
    return (
      <div>
        <TableHeader
          itemClickHandler={this.props.onHeaderClick}
          cols={this.getKeys()}
          sort={this.props.sort} />

        {this.currentPagination().map((datum, i) => {
          return (
            <div key={i} className="Table-row" >
              {this.buildTableItems(datum)}
            </div>
          )
        })}
        {this.props.data.length}
        <button disabled={this.state.pageStart === 0} onClick={this.prevPage.bind(this)}>prev</button>
        <button disabled={this.state.pageEnd >= this.props.data.length}  onClick={this.nextPage.bind(this)}>next</button>
      </div>
    )
  }
}


Table.propTypes = propTypes;

export default Table