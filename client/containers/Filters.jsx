import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as ActionCreators from './../actions/ActionCreators'
import {filterTrackList} from './../actions/FilterTracks'

import Filter from './../components/Filter'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filterOptions: PropTypes.object.isRequired
}

class Filters extends React.Component {
  constructor (props) {
    super(props)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange (filter, min, max) {
    const { dispatch } = this.props
    // / 100 to normalize the data (the slider is on a 0 - 100 scale)
    dispatch(ActionCreators.updateFilter(filter, {
      max: +(max / 100),
      min: +(min / 100)
    }))

    dispatch(filterTrackList())
  }

  getCountOfFiltersActive () {
    const { filterOptions } = this.props
    let count = 0
    Object.keys(filterOptions).forEach((filterKey) => {
      const filter = filterOptions[filterKey]
      if (filter.min !== 0 || filter.max !== 1) {
        count++
      }
    })
    return count
  }

  generateFilters () {
    const {filterOptions} = this.props
    const filterKeys = Object.keys(filterOptions)

    return filterKeys.map((filterKey) => {
      const filter = filterOptions[filterKey]
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

  render () {
    return (
      <div className='Pane Pane--4 Filters'>
        <div className='Pane-topBar'>
          <h2>{this.getCountOfFiltersActive()} Active Filter</h2>
        </div>
        <div className='Pane-content'>
          {this.generateFilters()}
        </div>
      </div>
    )
  }
}

Filters.propTypes = propTypes

function mapStateToProps (state) {
  return {
    filterOptions: state.filter.filterOptions
  }
}

export default connect(mapStateToProps)(Filters)
