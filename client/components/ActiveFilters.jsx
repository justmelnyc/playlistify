import React, { PropTypes } from 'react'

const propTypes = {
  filters: PropTypes.arrayOf(String).isRequired,
  onClick: PropTypes.func.isRequired
};

class ActiveFilters extends React.Component {

  render() {
    const {filters, onClick} = this.props
    console.log(filters)
    return (
      <div className="Sorter-activeContainer">
        {filters.map((filter, i) => <div key={i} onClick={() => {onClick(filter)}} className="Sorter-inactiveChip">{filter}</div>)}
      </div>
    )
  }
}

ActiveFilters.propTypes = propTypes;

export default ActiveFilters 
