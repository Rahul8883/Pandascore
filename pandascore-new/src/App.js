import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import  Home  from "./component/home";
import Login from './component/login';
import Dashboard from './component/dashboard';
import DashboardComp from './component/dashboardComponent';

/**
 * stateless functional component.
 * here, providing root path of the component.
 */
function App (){
    return (
      <div>
      <Router>
          <Route path="/" exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
          <Route path='/demodash' exact component={DashboardComp}></Route>
      </Router>
      </div>
    )
  }


export default App
