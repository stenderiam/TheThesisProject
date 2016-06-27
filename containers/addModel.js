import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { uploadModel, addModel as addModelApi } from '../utils/APIUtils';
import { addModel, updateModel, deleteModel } from '../actions';
import _ from 'lodash';

// Container to display details the form of adding model

export default class AddModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
    this._handleSave = this._handleSave.bind(this);
    this._onImageChange = this._onImageChange.bind(this);
  }


  updateModel(store, model_id) {
    loadoneModel(model_id).then(function(val) {
      store.dispatch(updateModel(val));
    })
    .catch(function(reason) {
      console.log('Handle rejected promise ('+reason+') here.');
    });
  }

  render() {

    return (
      <div className='box'>
           <div className='box__info'>   
               <div className='info__name'>
                  <input ref="name" type="text" className="inputs" placeholder="Name" maxLength="60"/>
               </div>
              <div className='info__desc'>
                  <textarea ref="desc" cols="30" rows="10" maxLength="650" placeholder="Description"></textarea>
               </div>
              <div className="info_upload_preview">Choose a preview picture              
                  <input onChange={this._onImageChange} ref="image" type="file" name="image"/> 
               </div>
                    <img style={{maxWidth: 100+'px'}} ref="imagePreview" src={this.state.image} alt=""/>                  
                    <div className="info_upload_model"> Choose a model                  
                      <div>
                        <input ref="model" type="file" name="model"/>
                      </div>
                   </div>
                <button onClick={this._handleSave} className="save">SAVE
               </button>
           </div>
      </div>
    );
  }

  _handleEdit() {
    this.setState({
      edit: true
    });
  }

  _handleSave() {
    const {store} = this.context;
    const modelFile = this.refs.model.files;
    const name = this.refs.name.value;
    const desc = this.refs.desc.value;
    const imageInput = this.refs.image;
    let image;
    if (imageInput.files && imageInput.files[0]) {
      image = this.state.image;
    }

    const data = {
      name: name,
      desc: desc,
      image: image
    };

    addModelApi(data).then(function(val) {
      const self = this;
      if (modelFile.hasOwnProperty(0) && modelFile[0] instanceof File) {
        let formData = new FormData();
        formData.append('model', modelFile[0]);
        uploadModel(formData, val.id).then(function(val) {
          store.dispatch(addModel(val));
          alert('Model added');
        });
      } else {
        store.dispatch(addModel(val));
        alert('Model added');
      }
    });
  }

  _onImageChange() {
    const self = this;
    const image = this.refs.image;
    if (image.files && image.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
          self.setState({
            image: e.target.result
          })
        };
        FR.readAsDataURL( image.files[0] );
    }
  }
}

AddModel.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object
};