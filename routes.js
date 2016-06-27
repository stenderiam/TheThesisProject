import React from 'react';
import { Route, Redirect, IndexRoute, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import addModel from './containers/addModel';
import Login from './containers/Login';
import Sign from './containers/Sign';

export default (
  <Route path='/' component={App}>
    <IndexRedirect to={'/Home'} />
    <Route path='/Home'
           component={Home} />
    <Route path='/addModel'
           component={addModel} />
    <Route path='/Login'
           component={Login} />      
    <Route path='/Sign'
           component={Sign} />
    <Route path='/models/:onemodel_id' component={About}/>  

  </Route>
);
