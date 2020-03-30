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
  };
}
const actionCreator = {
  getAllUserList: userAction.getAllData
};
class adminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      columns: [
        { title: "Name", prop: "name" },
        { title: "Armor", prop: "armor" },
        { title: "Attack Damage", prop: "attackdamage" },
        { title: "Attack Range", prop: "attackrange" },
        { title: "Hpper level", prop: "hpperlevel" },
        { title: "Spell Block", prop: "spellblock" },
        { title: "Select User", prop: "actions" }
      ],
      selectedUSer : [],
              actions: [
                {
                    icon: 'ADD',
                    tooltip: 'Select User',

                    onClick: (rowData) => {
                        this.onAddClick(rowData);                                  
                    }
                },
                {
                    icon: 'Reject',
                    tooltip: 'Delete Index',
                    onClick: (rowData) => {
                        this.onCancelClick(rowData);
                    }
                },
            ],
              options: {
                showTitle: false,
                actionsColumnIndex: -1,
                searchFieldStyle: {
                    color: "#fff"
                }
            },
    }
  }

        onAddClick =(data)=>{
          this.setState({
            selectedUSer : data
          })
    }
        handleClikOpen = () => {
          this.setState({
            open: true
          });
        };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    this.props.getAllUserList(true);
    this.setState({
      data: this.props.userList
    });
    console.log("Data coming from back-end in userList : ", this.state.data);

  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    console.log("Data coming from back-end in userList : ", this.props.userList);
    
  

    return (
      <Fragment>
        <Helmet><title>Pandascore - Dashboard</title></Helmet>
      
     
       <div id="dashboard-home">
         <section>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%", border:"2px solid #e7667c", height:"80px", alignItems:"center",     backgroundColor: "rgba(0, 0, 0, 0.3)" }}>

              <div style={{ fontSize: "23px" }}>
                <span style={{ color: "black", fontWeight: "700" }}>Panda</span>
                <span style={{ color: "#b300de", fontWeight: "700" }}>
                  Score
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "30%"
                }}
              >
                <div
                  style={{
                    border: "2px solid",
                    height: "35px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    color: "#c3178e",
                    cursor:"pointer"
                  }}
                  onClick={this.handleClikOpen} >   Watch List </div>
                <div style={{ border: "2px solid", height: "35px", padding: "12px", display: "flex", alignItems: "center", color: "#c3178e", cursor:"pointer" }}
                 onClick={this.handleLogout}> Logout </div>
              </div>
            </div>

        <div style={{ width: "100%" }}>
          <div style={{ marginTop: "1rem" }}>
          <MuiThemeProvider theme={theme}>
            <DataTable
              style={{ marginTop: "200px" }}
              keys="name"
              columns={this.state.columns}
              initialData={this.props.userList}
              actions={this.state.actions}
              options={this.state.options}
              initialPageLength={10}
              initialSortBy={{ prop: "name", order: "increasing" }}/>
            </MuiThemeProvider>
          </div>
        </div>


        <div>
          <Dialog
            fullScreen
            open={this.state.open}
            TransitionComponent={Transition}>
                <div id="dashboard-home"
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close">
<div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%", border:"2px solid #e7667c", height:"80px", alignItems:"center", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>

              <div style={{ fontSize: "23px" }}>
                <span style={{ color: "black", fontWeight: "700" }}>Panda</span>
                <span style={{ color: "#b300de", fontWeight: "700" }}>
                  Score
                </span>
<span style={{ color: "black", fontWeight: "700", marginLeft:"15px" }}>Watch List : 1</span>
              </div>
              <div
                style={{display: "flex", justifyContent: "space-around", width: "30%" }}>
                
                <div style={{ border: "2px solid", height: "35px", padding: "12px", display: "flex", alignItems: "center", color: "#c3178e", cursor:"pointer" }}
                 onClick={this.handleLogout}> Logout </div>
                 <div> <CloseIcon  onClose={this.handleClose}/> </div>
              </div>
            </div>
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
</table>           
                </div>
             
         
          </Dialog>
        </div>
        </section>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapState, actionCreator)(adminDashboard);
