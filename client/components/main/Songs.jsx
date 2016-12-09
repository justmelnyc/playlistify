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
    console.log(this.state, 'asdf')
  }

  render() {
    return (
      <div onClick={this.handleClick}  className="Song">
        <div className="Song-song">{this.props.song}</div>
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

function RandomSongs() {
  const data = [
    {
      song: "flume",
      artist: "Bon Iver",
      album: "Emma, Forever Ago"
    },
    {
      song: "The Wolves",
      artist: "Bon Iver",
      album: "Emma, Forever Ago"
    },
    {
      song: "For Emma",
      artist: "Bon Iver",
      album: "Emma, Forever Ago"
    }
  ];
  return (
    <div>
      {data.map((d) => {
        return <Song key={d.song} song={d.song} artist={d.artist} album={d.album} />
      })}
    </div>
  );
}

export class Songs extends React.Component {
  render() {
    return (
      <div className="Songs">
        <SongsHeader />
        <RandomSongs />
      </div>
    )
  }
}
