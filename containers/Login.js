import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='login'>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
  };
}

export default connect(mapStateToProps, {})(Login);

