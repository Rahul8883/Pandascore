/**
 *
 * PrivateRoutes
 *
 */
import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {  
  var session_token=localStorage.getItem('token')

  return (
    <Route {...rest} render={props => (
     session_token !== null ? (
      < Component  {...props} />
      ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
              }}
            />
          )
      )} 
    />
  )
};


export default withRouter(PrivateRoutes);