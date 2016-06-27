import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Sign extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='sign'>        
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
  };
}

export default connect(mapStateToProps, {})(Sign);
