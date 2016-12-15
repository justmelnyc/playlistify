import React, { PropTypes } from 'react'

const propTypes = {
  filters: PropTypes.arrayOf(String).isRequired,
  onClick: PropTypes.func.isRequired
};

class InactiveFilters extends React.Component {

  render() {
    const {filters, onClick} = this.props
    console.log(filters)
    return (
      <div className="Sorter-inactiveContainer">
        {filters.map((filter, i) => <div key={i} onClick={() => {onClick(filter)}} className="Sorter-inactiveChip">{filter}</div>)}
      </div>
    )
  }
}

InactiveFilters.propTypes = propTypes;

export default InactiveFilters 
