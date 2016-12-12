import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Songs from './Songs';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  trackList: PropTypes.array.isRequired,
  totalSongs: PropTypes.number.isRequired
};

class Viewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageStart: 0,
      pageEnd: 10,
      pageInterval: 10
    }
  }

  currentPagination() {
    return this.props.trackList.slice(this.state.pageStart, this.state.pageEnd)
  }

  nextPage() {
    this.setState((prevState) => {
      const pageStart = prevState.pageEnd
      const pageEnd = pageStart + this.state.pageInterval

      if (pageEnd <= this.props.totalSongs) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }
    })
  }

  prevPage() {
    this.setState((prevState) => {
      const pageEnd = prevState.pageStart
      const pageStart = prevState.pageStart - this.state.pageInterval

      if (pageStart >= 0) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }

    })
  }

  render() {
    return (
      <div>
        <Songs songKeys={this.currentPagination()} />
        <button disabled={this.state.pageStart === 0} onClick={this.prevPage.bind(this)}>prev</button>
        <button disabled={this.state.pageEnd >= this.props.totalSongs} onClick={this.nextPage.bind(this)}>next</button>
      </div>
    )
  }
}

Viewer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    trackList: state.user.trackList,
    totalSongs: state.musicData.totalSongs
  }
}

export default connect(mapStateToProps)(Viewer);
