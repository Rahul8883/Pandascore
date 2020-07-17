import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import  Home  from "./component/home";
import Login from './component/login';
import DashboardComp from './component/dashboard.component';
import WatchList from './component/watchlist'
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
          <Route path='/dashboard' exact strict render={()=>(
           localStorage.getItem('token')? (<DashboardComp/>) : (<Redirect to='/login'/>)
          )}></Route>
          <Route path ='/dashboard/watchlist' exact component={WatchList}></Route>
      </Router>
      </div>
    )
  }


export default App
