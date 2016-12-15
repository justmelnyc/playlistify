import React, { PropTypes } from 'react'

const propTypes = {
  filterKeys: PropTypes.arrayOf(String).isRequired,
  onClick: PropTypes.func.isRequired
};

class InactiveFilters extends React.Component {

  generateInactiveFilters() {
    const {filterKeys, onClick} = this.props
    return filterKeys.map((filter, i) => {
      return (
        <div key={i} onClick={() => { onClick(filter) } } className="Sorter-inactiveChip">
          {filter}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="Sorter-inactiveContainer">
        {this.generateInactiveFilters()}
      </div>
    )
  }
}

InactiveFilters.propTypes = propTypes;

export default InactiveFilters 
