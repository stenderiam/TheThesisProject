import React, { Component, PropTypes } from 'react';
import Menu from './Menu';

export default class Photo extends Component {

 // Component to display header menu
 
  render() {

    const {links} = this.props;

    return (
      <div className='header clearfix'>
        <div className='header__logo'>
            3Dazzle 
        </div>
        <Menu links={links}  />
      </div>
    );
  }
}

Photo.propTypes = {
  links: PropTypes.array.isRequired,
};
