/**
 *
 * TODO:
 * be able to go to different pages by tabs
 * have the tab have the classname .active if it is the curr page
 *
 */

import React, { PropTypes } from 'react'

import TableHeader from './TableHeader'
import TableFooter from './TableFooter'

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
      currentPage: 0,
      pageInterval: 20
    }
    this.handlePageSelection = this.handlePageSelection.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  buildTableItems (datum) {
    const keys = Object.keys(datum)
    return keys.map((key, i) => <div className='Table-item' key={key}>{datum[key].name}</div>)
  }

  getKeys () {
    return this.props.data[0] ? Object.keys(this.props.data[0]) : []
  }

  /**
   *
   * Pagination
   *
   */

  currentPage () {
    const { currentPage } = this.state
    const numOfPages = this.numberOfPages()
    return currentPage <= numOfPages ? currentPage : numOfPages
  }

  numberOfPages () {
    const { pageInterval } = this.state
    const { data } = this.props
    return Math.floor(data.length / pageInterval)
  }

  handlePageSelection (pageNum) {
    this.setState({
      currentPage: pageNum
    })
  }

  nextPage () {
    const { currentPage } = this.state
    if (currentPage + 1 <= this.numberOfPages()) {
      this.setState({
        currentPage: currentPage + 1
      })
    }
  }

  previousPage () {
    const { currentPage } = this.state
    if (currentPage - 1 >= 0) {
      this.setState({
        currentPage: currentPage - 1
      })
    }
  }

  // returns array [startIndex, endIndex]
  indexOfDataInView () {
    const { pageInterval } = this.state
    const startIndex = this.currentPage() * pageInterval
    const endIndex = startIndex + pageInterval
    return [startIndex, endIndex]
  }

  dataToDisplay () {
    const {data} = this.props
    const [startIndex, endIndex] = this.indexOfDataInView()
    return data.slice(startIndex, endIndex)
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
          {this.dataToDisplay().map((datum, i) => {
            return (
              <div key={i} className='Table-row' >
                {this.buildTableItems(datum)}
              </div>
            )
          })}
        </div>

        <TableFooter
          numOfPages={this.numberOfPages()}
          currPage={this.currentPage()}
          selectPage={this.handlePageSelection}
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          />

      </div>
    )
  }
}

Table.propTypes = propTypes

export default Table

/*
<div className='Table-footer'>

          <div className='Pagination'>
            {this.generatePageTabs()}
          </div>

        </div>
*/
