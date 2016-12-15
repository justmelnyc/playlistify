import React, { PropTypes } from 'react'

const propTypes = {
  profile: PropTypes.object
};

class ProfileBar extends React.Component {
  constructor(props) {
    super(props)
    this.profile = this.props.profile
  }

  render() {
    console.log(this.props)
    const profile = this.props.profile
    // const imageUrl = profile.images ? profile.images[0].url : null
    return (
      // <nav className="Navbar">
      //   <a className="navbar-brand" >
      //     <div className="Avatar">
      //       <img src={imageUrl} alt="" />
      //     </div>
      //   </a>
      //   <h2>{profile.display_name}</h2>
      // </nav>
      <div className="console"></div>
    )
  }
}

ProfileBar.propTypes = propTypes;

export default ProfileBar 