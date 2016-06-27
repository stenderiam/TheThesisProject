import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
export default class Model extends Component  {

 // Component to display only one preview of a model on the HOME page
 // Includes a transfer link to a page view of a model by id
 
  render() {
     const {model} = this.props;

    return (
       <div className="flex-item hvr-box-shadow-outset"> 
      <Link to={'/models/'+model.id}>
        <img className="pic_size" src={model.image} alt=''/>
      </Link>
    </div>
    );
  }
}
 
 Model.propTypes = {
  model: PropTypes.object.isRequired,
};

