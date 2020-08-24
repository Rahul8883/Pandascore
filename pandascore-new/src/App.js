import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import  Home  from "./component/home";
import Login from './component/login';
import DashboardComp from './component/dashboard.component';
import WatchList from './component/watchlist';
import Registration from './component/registration';
import PrivateRoute from './component/privateRoute';
import HooksExample from './component/hooksExample'
/**
 * stateless functional component.
 * here, providing root path of the component.
 */
function App (){
    return (
      <div>
      <Router>
        <Switch>
        <Route path="/HooksExample" exact component={HooksExample}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/registration' exaxt component={Registration}></Route>
          <PrivateRoute path='/dashboard' exact component={DashboardComp}></PrivateRoute>
          <PrivateRoute path ='/dashboard/watchlist' exact component={WatchList}></PrivateRoute>
          <Route component={NotFound}></Route>
          </Switch>
      </Router>
      </div>
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
