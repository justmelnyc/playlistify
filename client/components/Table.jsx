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
  }

  buildTableItems(datum) {
    const keys = Object.keys(datum)
    return keys.map((key, i) => <div className="Table-item" key={key}>{datum[key].name}</div>)
  }

  getKeys() {
    return this.props.data[0] ? Object.keys(this.props.data[0]) : [] 
  }

  render() {
    return (
      <div>
        <TableHeader
          itemClickHandler={this.props.onHeaderClick}
          cols={this.getKeys()} 
          sort={this.props.sort}/>

        {this.props.data.map((datum, i) => {
          return (
            <div key={i} className="Table-row" >
              {this.buildTableItems(datum)}
            </div>
          )
        })}
      </div>
    )
  }
}


Table.propTypes = propTypes;

export default Table