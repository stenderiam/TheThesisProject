import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Model from '../components/Model';
import { Link } from 'react-router';
import _ from 'lodash';

// Container to display HOME page of the model

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {models} = this.props;
    var key = 0;
    var childElements = models.map(function(element) {
      key++;
      return (
         <Model key={key} model={element} />
       );
    });

    return (
    <div>
        <div className='header__search'>
            <div className='header__name'>Making 3D accessible 
          </div>
           <div className='search_place'> 
                <div className="container-1">
                  <span className="icon"><i className="fa fa-search"></i></span>
                   <input type="search" id="search" placeholder="What would you like to find?" />
                </div>
           </div>
        </div>
        <div className='most_popular'> BROWS CATALOG 
        </div>
        <div className="flex-container "> 
          {childElements}        
        </div>
      <div className='footer'></div>
    </div>
    );
  }
}

Home.propTypes = {
  models: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
  return {
    models: state.models.data
  };
}

export default connect(mapStateToProps, {})(Home);
