import React, { PropTypes } from 'react'

import Filter from './Filter'
import * as ActionCreators from './../actions/ActionCreators'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filterKeys: PropTypes.arrayOf(String).isRequired,
  filters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

class ActiveFilters extends React.Component {
  constructor(props) {
    super(props)

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange(filter, min, max) {
    // / 100 to normalize the data (the slider is on a 0 - 100 scale)
    this.props.dispatch(ActionCreators.updateFilter(filter, {
      max: +(max / 100),
      min: +(min / 100)
    }))
  }

  generateFilters() {
    const {filters, onClick, filterKeys} = this.props
    return filterKeys.map((filterKey) => {
      const filter = filters[filterKey]
      return (
        <Filter
          key={filterKey}
          onChange={this.onFilterChange}
          filterKey={filterKey}
          filter={filter}
          />
      )
    })
  }

  render() {
    const {filters, filterKeys} = this.props
    return (
      <div className="Sorter-activeContainer">
        {this.generateFilters()}
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