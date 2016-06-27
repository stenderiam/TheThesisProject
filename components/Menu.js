import React, { Component, PropTypes } from 'react';

export default class Photo extends Component {

 // Component to display header menu

  render() {
    
    const {links} = this.props;

    return (
      <div className='header__menu menu'>
        {links}
      </div>
    );
  }
}

Photo.propTypes = {
  links: PropTypes.array.isRequired,
};
