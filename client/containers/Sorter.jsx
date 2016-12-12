import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

const propTypes = {
};

class Sorter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Songs-header Song">
        <div className="Song-song">Song</div>
        <div className="Song-artist">Artist</div>
        <div className="Song-album">Album</div>
      </div>
    )
  }
}

Sorter.propTypes = propTypes;

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Sorter);
