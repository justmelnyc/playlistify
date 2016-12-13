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
    return keys.map((key, i) => <div className="Table-item" key={key}>{datum[key]}</div>)
  }

  render() {
    return (
      <div>
        <TableHeader
          itemClickHandler={this.props.onHeaderClick}
          cols={Object.keys(this.props.data[0])} 
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