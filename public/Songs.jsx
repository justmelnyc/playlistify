import * as React from 'react';

const SongDetails = (props) => {
  if (props.showDetails) {
    return (
      <div className="Song-details">
        a lot of details here
      </div>
    );
  } else {
    return null;
  }
}

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  }

  render() {
    const {name} = this.props.song
    return (
      <div onClick={this.handleClick} className="Song">
        <div className="Song-song">{name}</div>
        <div className="Song-artist">{this.props.artist}</div>
        <div className="Song-album">{this.props.album}</div>
        <div className="Song-remove">
          <button className="btn btn-danger btn--small">Remove</button>
        </div>
        <SongDetails showDetails={this.state.showDetails} />
      </div>
    );
  }
}


/**
 * 
 * Songs
 * 
 */

function SongsHeader() {
  return (
    <div className="Songs-header Song">
      <div className="Song-song">Song</div>
      <div className="Song-artist">Artist</div>
      <div className="Song-album">Album</div>
      <div className="Song-remove">Remove</div>
    </div>
  );
}

export class Songs extends React.Component {
  render() {
    const {  songs } = this.props
    return (
      <div className="Songs">
        <SongsHeader />
        {songs &&
          Object.keys(songs).map((id) =>
            <Song key={id} song={songs[id]} />
          )
        }
      </div>
    );
  }
}
