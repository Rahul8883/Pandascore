import React, { Component, Fragment } from 'react'
import { Button } from '@material-ui/core';
import Helmet from 'react-helmet';

export class Watchlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // watchListData: this.props.location.state.watchlist,
      watchListData :JSON.parse(localStorage.getItem("watchListData")),
      watchListCount : "",
      columns: [
        { name: "Name", armor: "Armor", attackdamage: "Attack Damage", attackrange: "Attack Range", hpperlevel: "Hpper level", spellblock: "Spell Block", action: "Action" },
      ],
     
    }
  }

componentDidMount(){
  
  // var unique = this.state.watchListData
  // var data =  [...new Set(unique)];
  var count1 = this.state.watchListData.length
  this.setState({
    // watchListData : data,
    watchListCount : count1
  })
}

/**
 * this function is use to remove data from the watch list
 */
  handleRemoveData = (data) => {
    console.log("data remove from index", data);
    const { watchListData } = this.state;
    this.state.watchListData.splice(data, 1);
    var count1 = this.state.watchListData.length;
    this.setState({
      watchListData,
      watchListCount : count1
    }, console.log("data removel process in watchlist component", this.state.watchListCount)
    )
  }
/**
 * This function is use to go to the dashboard component.
 */
  handleOpenCamp = () => {
    // var data = {
    //   watch: this.state.watchListData
    // }
    this.props.history.push('/dashboard',)
  }
  /**
   * This function is use to log out from the application
   */
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/')
  }

  render() {
 
    return (
      <Fragment>
        <Helmet> <title>Quiz App -  WatchList</title></Helmet>
        <div id="watchlist-container">
          <section>
            <div className="watchlist">
              <div className="name-main">
                <span className="name-1">Panda</span>
                <span className="name-2">
                  Score
                </span>
              </div>
             <div> <h4> No of Selected Champion : {this.state.watchListCount}</h4></div>
              <div className="champ-main">
                <div className="champ"
                  onClick={this.handleOpenCamp} >Champion List </div>
                    {/* <Link to="/dashboard">Champion List</Link> */}


                <div className="logout"
                  onClick={this.handleLogout}> Logout </div>
              </div>
            </div>
            {
            //  This logic is use to display data in watch list which is selected from user
              this.state.watchListData.map((key, index) => {
                return (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <table>
                      <tr >
                        <td>{key.name}</td>
                        <td>Armor - {key.armor}</td>
                        <td>Attack Damage - {key.attackdamage}</td>
                        <td> Attack Range - {key.attackrange}</td>
                        <td> Hpper Level - {key.hpperlevel}</td>
                        <td> Spell Block - {key.spellblock}</td>
                        <td><Button style={{color : "red"}}   onClick={() => this.handleRemoveData(index)}>Remove</Button></td>
                      </tr>
                    </table>
                  </div>
                )
              })
            }
          </section>
        </div>
      </Fragment>
    )
  }
}

export default Watchlist
