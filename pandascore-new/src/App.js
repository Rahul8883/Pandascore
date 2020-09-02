import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import  Home  from "./component/home";
import Login from './component/login';
import WatchList from './component/watchlist';
import Registration from './component/registration';
import PrivateRoute from './component/privateRoute';
import Dashboard from './component/dashboard'
/**
 * stateless functional component.
 * here, providing root path of the component.
 */
function App (){
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/registration' exaxt component={Registration}></Route>
          <PrivateRoute path='/dashboard' exact component={Dashboard}></PrivateRoute>
          <PrivateRoute path ='/watchlist' exact component={WatchList}></PrivateRoute>
          <Route component={NotFound}></Route>
          </Switch>
      </Router>
    )
  }


/**
 * This function is use to  indication whenever any wrong path entered into the browser.
 */
  function NotFound(){
    return(
      <div>
        <h1>Page Not Found 404</h1>
      </div>
    )
  }

export default App
