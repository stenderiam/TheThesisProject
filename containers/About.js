import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TestModel from '../components/TestModel';
import { loadoneModel, uploadModel, updateModel as updateModelApi, deleteModel as deleteModelApi } from '../utils/APIUtils';
import { updateModel, deleteModel } from '../actions';
import _ from 'lodash';

// Container to display details view of a model

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      image: '',
    };
    this._handleDelete = this._handleDelete.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._onImageChange = this._onImageChange.bind(this);
  }

  componentDidMount() {
    const {store} = this.context;
    const {onemodel} = this.props; 
    if(typeof onemodel !== 'undefined' && onemodel.full !== true) {
      this.updateModel(store, onemodel.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {store} = this.context;
    const {onemodel} = nextProps;
    this.setState({
      image: onemodel.image
    });
    if(typeof onemodel !== 'undefined' && onemodel.full !== true) {
      this.updateModel(store, onemodel.id)
    }
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

    const {onemodel} = this.props;
    const {edit} = this.state;
    let displayModel = '';
    if (typeof onemodel !== 'undefined') {
      if(onemodel.onemodel) {
        displayModel = <TestModel model={onemodel.onemodel} />;
      }
      if (edit === true) {
        return (
          <div className='box'>
               <div className='box__info'>

                   <div className='info__name'>
                    <input ref="name" defaultValue={onemodel.name} type="text" className="inputs" placeholder="Name" maxLength="60"/>
                   </div>
                  <div className='info__desc'>
                     <textarea ref="desc" defaultValue={onemodel.desc} cols="30" rows="10" maxLength="650" placeholder="Description"></textarea>
                   </div>
                       <div className="info_upload_preview">
                      Preview picture
                      </div>
                      <div className="file_upload">
                        <input onChange={this._onImageChange} ref="image" type="file" name="image"/>
                        <img style={{maxWidth: 100+'px'}} ref="imagePreview" src={this.state.image} alt=""/>
                      </div>
                      <div className="info_upload_model">
                      Model
                      </div>
                      <div className="file_upload">
                        <input ref="model" type="file" name="model"/>
                      </div>
                    <button onClick={this._handleSave} className="save">SAVE
                    </button>
                      <button onClick={this._handleDelete} className="delete"> DELETE
                    </button>
               </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className='model'>
                    <div className='model__name'>
                      {onemodel.name}
                    </div>
                    <div className='model__view'>
                      {displayModel}
                   </div>
                   <div className='model__info'>
                        <div className='info__description'>
                          <div className='description__style'>DESCRIPTION
                              <div className=' text'>
                                  {onemodel.desc}
                              </div>
                          </div>
                        </div>
                        <button onClick={this._handleDelete} className="delete_btn">DELETE
                      </button>
                        <button onClick={this._handleEdit} className="edit_btn">EDIT
                      </button>      
                   </div>
             </div>
        </div>
        );
      }
    } else {
      return ( <div></div>)
    }
  }

  _handleDelete() {
    const {store} = this.context;
    const {onemodel} = this.props;
    var c = confirm("Delete this model?");
    if (c == true) {
      deleteModelApi(onemodel);
      store.dispatch(deleteModel(onemodel));
      this.context.router.push('/');
    }
  }

  _handleEdit() {
    this.setState({
      edit: true
    });
  }

  _handleSave() {
    const self = this;
    const {store} = this.context;
    const {onemodel} = this.props;
    const modelFile = this.refs.model.files;
    const name = this.refs.name.value;
    const desc = this.refs.desc.value;
    const imageInput = this.refs.image;
    let image;
    if (imageInput.files && imageInput.files[0]) {
      image = this.state.image;
    }

    const data = {
      id: onemodel.id,
      name: name,
      desc: desc,
      image: image
    };

    updateModelApi(data).then(function(val) {
      if (modelFile.hasOwnProperty(0) && modelFile[0] instanceof File) {
        let formData = new FormData();
        formData.append('model', modelFile[0]);
        uploadModel(formData, onemodel.id).then(function(val) {
          store.dispatch(updateModel(val));
          self.setState({
            edit: false
          });
        });
      } else {
        store.dispatch(updateModel(val));
        self.setState({
          edit: false
        });
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

About.propTypes = {
  push: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

About.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object
};

function mapStateToProps(state, props) {
  const model = _.find(state.models.data, function(model) {
    return props.params.onemodel_id == model.id;
  });
  return {
    onemodel: model
  };
}

export default connect(mapStateToProps, {
  push
})(About);
