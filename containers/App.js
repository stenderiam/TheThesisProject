import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadModels } from '../actions';
import { Link } from 'react-router';
import Header from '../components/Header';

// Main container of the app

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {store} = this.context;
    store.dispatch(loadModels());
  }

  render() {
    const {children} = this.props;
    const links = [

      {link: '/Home', name: 'HOME', linkClass: 'menu__link'},
      {link: '/addModel', name: 'NEW MODEL', linkClass: 'button'},
      {link: '/Login', name: 'LOG IN', linkClass: 'menu__link--about'},
      {link: '/Sign', name: 'SIGN UP', linkClass: 'menu__link'},

    ].map(l => {

      return <div className='menu__link-wrapper' key={l.name}>
        <Link activeClassName='menu__link--active' title={l.name} className={'menu__link ' + l.linkClass } to={l.link}>{l.name}</Link>
      </div>;
    });

    return (
      <div className='container'>
        <Header links={links} />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  push: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

App.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state) {

  return {
  };
}

export default connect(mapStateToProps, {
  push
})(App);