import React, { PropTypes } from 'react'

import Filter from './Filter'
import * as ActionCreators from './../actions/ActionCreators'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeFilters: PropTypes.arrayOf(String).isRequired,
  filters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

class ActiveFilters extends React.Component {

  onFilterChange(filter, min, max) {
    this.props.dispatch(ActionCreators.updateFilter(filter, {
      max: +(max / 100),
      min: +(min / 100)
    }))
  }

  render() {
    const {filters, onClick, activeFilters} = this.props
    return (
      <div className="Sorter-activeContainer">
        {activeFilters.map((filter) => {
          return <Filter key={filter} onChange={this.onFilterChange.bind(this)} filterKey={filter} filter={filters[filter]} />
        })}
      </div>
    )
  }
}

ActiveFilters.propTypes = propTypes;

export default ActiveFilters


/*
    //     {
    //         filters.map((filter, i) => {
    //         return <div key={i} onClick={() => {onClick(filter)}} className="Sorter-inactiveChip">{filter}</div>
    //     }
    // }
*/