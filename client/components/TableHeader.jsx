import React, { PropTypes } from 'react'

const propTypes = {
  cols: PropTypes.array.isRequired,
  itemClickHandler: PropTypes.func,
  sort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
  })
}

class TableHeader extends React.Component {

  /**
   *
   * Returns the key and and either asc or desc
   * sort = {
   *  key: OBJECT KEY,
   *  direction: 'asc' | 'desc'
   * }
   *
   */

  handleClick () {

  }

  getItemsClass (key) {
    let newClass = 'Table-item'

    if (this.props.sort && this.props.sort.key === key) {
      newClass += ' ' + this.props.sort.direction
    }

    return newClass
  }

  render () {
    return (
      <div className='Table-row Table-row--header'>
        {this.props.cols.map((col) => <div
          key={col}
          onClick={() => this.props.itemClickHandler(col)}
          className={this.getItemsClass(col)}>{col}</div>)}
      </div>
    )
  }
}

TableHeader.propTypes = propTypes

export default TableHeader
