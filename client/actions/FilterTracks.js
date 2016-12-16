import * as ActionCreators from './ActionCreators';

export const filterTrackList = () => {
  return (dispatch, getState) => {
    const { filter, entities } = getState()
    const { filterOptions } = filter 
    const { trackList, tracks } = entities

    const filteredTrackList = filteredTracks(trackList, tracks, filterOptions)
    dispatch(ActionCreators.setFilteredTrackList(filteredTrackList))
  }
}

function filteredTracks(trackList, tracks, filterOptions) {
  return trackList.filter((id) => {
      const track = tracks[id]
      let keepTrack = true

      Object.keys(filterOptions).forEach((filterKey) => {
        const currFilter = filterOptions[filterKey]
        const min = currFilter.min
        const max = currFilter.max
        const trackValue = track[filterKey]
        if (trackValue < min || trackValue > max) { keepTrack = false }
      })

      return keepTrack
    })
}
