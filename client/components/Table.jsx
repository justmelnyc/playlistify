/**
 *
 * TODO:
 * be able to go to different pages by tabs
 * have the tab have the classname .active if it is the curr page
 *
 */

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
  constructor (props) {
    super(props)
    this.state = {
      pageStart: 0,
      pageEnd: 20,
      pageInterval: 20
    }
  }

  buildTableItems (datum) {
    const keys = Object.keys(datum)
    return keys.map((key, i) => <div className='Table-item' key={key}>{datum[key].name}</div>)
  }

  getKeys () {
    return this.props.data[0] ? Object.keys(this.props.data[0]) : []
  }

  currentPagination () {
    const {data} = this.props
    return data.slice(this.state.pageStart, this.state.pageEnd)
  }

  nextPage () {
    this.setState((prevState) => {
      const pageStart = prevState.pageEnd
      const pageEnd = pageStart + this.state.pageInterval

      if (pageEnd <= this.props.data.length) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd
        }
      }
    })
  }

  prevPage () {
    this.setState((prevState) => {
      const pageEnd = prevState.pageStart
      const pageStart = prevState.pageStart - this.state.pageInterval

      if (pageStart >= 0) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd
        }
      }
    })
  }

  goToPage (pageNum) {

  }

  generatePageTabs () {
    const pageNums = Math.ceil(this.props.data.length / this.state.pageInterval)
    let tabs = []
    for (let i = 0; i <= pageNums; i++) {
      tabs.push(
        <li key={i} onClick={this.goToPage(i)} ><span>{i + 1}</span></li>
      )
    }

    if (tabs.length > 5) {
      tabs = tabs.slice(0, 4)
      tabs.push(<li><span>...</span></li>)
    }

    return (<ul><li className='paginator'>Prev</li>{tabs}<li className='paginator'>Next</li></ul>)
  }

  render () {
    return (
      <div className='Table'>

        <div className='Table-header'>
          <TableHeader
            itemClickHandler={this.props.onHeaderClick}
            cols={this.getKeys()}
            sort={this.props.sort} />
        </div>

        <div className='Table-items'>
          {this.currentPagination().map((datum, i) => {
            return (
              <div key={i} className='Table-row' >
                {this.buildTableItems(datum)}
              </div>
            )
          })}
        </div>

        <div className='Table-footer'>

          <div className='Pagination'>
            {this.generatePageTabs()}
          </div>

        </div>

      </div>
    )
  }
}

Table.propTypes = propTypes

export default Table
