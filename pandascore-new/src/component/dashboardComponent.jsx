import React, { Component, Fragment } from "react";
import {
  Dialog,
  Slide,
  createMuiTheme,
   MuiThemeProvider 
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { userAction } from "../action/user.action";
import Helmet from "react-helmet";
var DataTable = require("react-data-components").DataTable;
const theme = createMuiTheme({
    overrides: {
       label : {
        fontFamily: "timesNewRoman",
        fontWeight:" 700",
        fontSize: "23px",
        color: "#943838"
       }
    }
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
function mapState(state) {
  console.log(
    "status of get all user details in Dashboard component",
    state.getAllDetail.user
  );
  return {
    userList: state.getAllDetail.user
  }
  
}

const actionCreator = {
  getAllUserList: userAction.getAllData
}

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Data: this.props.userList       
    }
  }

  componentDidMount() {
    this.props.getAllUserList(true);
    this.setState({
      Data: this.props.userList
    });
    console.log("all data comes in pandascore ", this.state.Data); 
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {    
    console.log("========================>",this.state.Data);
    return (
      <Fragment>
        <Helmet><title>Pandascore - Dashboard</title></Helmet>





       <div id="dashboard-home">
         <section>
         <h2>Selected Player List </h2>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                    <th>Country</th>
                    <th>Country</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Hello</td>
                    <td>Rahul Ji</td>
                </tr>
            </table> 
        </section>
        </div>
      </Fragment>
    );
  }
}

export default connect(mapState, actionCreator)(AdminDashboard);
