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
  albums: PropTypes.object.isRequired
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

    dispatch(ActionCreators.setFilteredTrackList(
      this.getListOfFilteredOutTracks()
    ))
  }

  getListOfFilteredOutTracks() {
    const { trackList } = this.props
    return trackList.filter((id) => {
      return this.trackIsNotFilteredOut(id)
    })
  }

  trackIsNotFilteredOut(trackId) {
    const { tracks, filters } = this.props
    const track = tracks[trackId]
    let keepTrack = true

    Object.keys(filters).forEach((filterKey) => {
      const currFilter = filters[filterKey]
      const min = currFilter.min
      const max = currFilter.max
      const trackValue = track[filterKey]
      if (trackValue < min || trackValue > max) { keepTrack = false }
    })

    return keepTrack
  }





  generateFilters() {
    const {filters} = this.props
    const filterKeys = Object.keys(filters)

    return filterKeys.map((filterKey) => {
      const filter = filters[filterKey]
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
    const { filters } = this.props
    let count = 0
    Object.keys(filters).forEach((filterKey) => {
      const filter = filters[filterKey]
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
    filters: state.filter
  }
}

export default connect(mapStateToProps)(Filters);
