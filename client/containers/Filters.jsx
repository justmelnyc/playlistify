import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import * as ActionCreators from './../actions/ActionCreators'

import Filter from './../components/Filter'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  trackList: PropTypes.array.isRequired,
  tracks: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,


  filterOptions: PropTypes.object.isRequired
};

class Filters extends React.Component {
  constructor(props) {
    super(props)
  }

  onFilterChange(filter, min, max) {
    const { dispatch } = this.props
    // / 100 to normalize the data (the slider is on a 0 - 100 scale)
    dispatch(ActionCreators.updateFilter(filter, {
      max: +(max / 100),
      min: +(min / 100)
    }))

    console.log(this.getFilteredListOfIds().length)

    dispatch(ActionCreators.setFilteredTrackList(
      this.getFilteredListOfIds()
    ))
  }





  getFilteredListOfIds() {
    const { trackList } = this.props
    return trackList.filter((id) => { return this.filterTracks(id) })
  }

  filterTracks(trackId) {
    const { trackList, tracks } = this.props
    const track = tracks[trackId]
    return this.isTrackInFilteredRange(track)
  }

  isTrackInFilteredRange(track) {
    const { filterOptions } = this.props
    let keepTrack = true

    Object.keys(filterOptions).forEach((filterKey) => {
      const currFilter = filterOptions[filterKey]
      const min = currFilter.min
      const max = currFilter.max
      const trackValue = track[filterKey]
      if (trackValue < min || trackValue > max) { keepTrack = false }
    })

    return keepTrack
  }







  generateFilters() {
    const {filterOptions} = this.props
    const filterKeys = Object.keys(filterOptions)

    return filterKeys.map((filterKey) => {
      const filter = filterOptions[filterKey]
      return (
        <Filter
          key={filterKey}
          onChange={this.onFilterChange.bind(this)}
          filterKey={filterKey}
          filter={filter}
          />
      )
    })
  }

  inactiveFilterKeys() {
    const { filters } = this.props
    return Object.keys(filters).filter((key) => { return !this.props.filters[key].active })
  }

  activeFilterKeys() {
    const { filters } = this.props
    return Object.keys(filters).filter((key) => { return this.props.filters[key].active })
  }

  handleInactiveClick(filter) {
    this.props.dispatch(ActionCreators.activateFilter(filter))
  }

  handleActiveClick(filter) {
    this.props.dispatch(ActionCreators.deactivateFilter(filter))
  }

  getCountOfFiltersActive() {
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

  render() {
    return (
      <div className="Pane Pane--4 Filters">
        <div className="Pane-topBar">
          <h2>{this.getCountOfFiltersActive()} Active Filter</h2>
        </div>
        <div className="Pane-content">
          {this.generateFilters()}
        </div>
      </div>
    )
  }
}

Filters.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    ...state.entities,
    filterOptions: state.filter.filterOptions
  }
}

export default connect(mapStateToProps)(Filters);
