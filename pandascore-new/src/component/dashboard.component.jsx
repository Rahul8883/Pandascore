import React, { Component, Fragment } from "react";
import { getAllData, getSearchResult } from "../service/user.services";
import Helmet from "react-helmet";
import { Slide, Button,} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Pagination from '../component/pagination';
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class dashboardcomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : 1,
      rowPageRange: 10,
      loading : false,
      pandascoreData: [],
      currentDataDisplay : [],
      count: 1,
      selectedData: [],
      columns: [
        { name: "Name",
          armor: "Armor",
          attackdamage: "Attack Damage", 
          attackrange: "Attack Range", 
          hpperlevel: "Hpper level", 
          spellblock: "Spell Block", 
          action: "Action" },
      ],
      open: false,
      nameData: [],
      page: 0,
      rowPerPage: 10,
      watchListData :"",
      watchListCount : "",
      wishlistAdded : []
    };
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
      })
    }

  /**
   * This function is use to go to the dashboard component.
   */
    handleOpenCamp = () => {
      this.setState({
        openWatchListData : false
      })
    }

    /**
     * This function is use to log out from the application
     */

    handleLogout = () => {
      localStorage.clear();
      this.props.history.push('/')
      // window.onpopstate = function (e) { window.history.forward(1); }
      if(localStorage.getItem('Login')) {
       this.props.history.pushState(null, null, this.props.location.href);
        window.onpopstate = function(event) {
         this.props.history.go(1);
        };
      } 
    }
    
  componentDidMount() {
    this.getData();  
    if (this.props.location.state) {
      this.setState({
        selectedData: this.props.location.state
      })
    }
  }

  handleOnChange = number => {
    this.setState({
      activePage: number
    });
  };

  /**
   * This function is use to seach the champ according to your entry data.
   */

  handleChange_Serchbox = (event) => {
    try {
      const searchData = event.target.value;
      getSearchResult(searchData).then(res => {
        var pandaDataSort = res.data;
        this.setState({
          currentDataDisplay : pandaDataSort
        }, console.log(this.state.currentDataDisplay)
        )
      }).catch(err => {
        console.log("err occr", err);
      })
    } catch (error) {
      console.log(error); 
    } 
  }
  /**
   * <handleAllDetail This function is use to know all details of the champ>
   * @param {data} data this is discribe all the details of the selected candiadte
   */

  handleAllDetail = (data) => {
    console.log("key value to find details odf the users",data);
    
    this.setState({
      open: true,
    })
    this.state.nameData.push(data)
    console.log("data receive form name action", this.state.nameData);
  }
  /**
   * this function is to close the dialogue box
   */
  handleClose = () => {
    this.setState({
      open: false
    });
     window.location.reload(false);
  };
 

  /**
   * <handleSelectData  this function is use for select champion.>
   * @param {data} data this is selected compion which is shorted from all list
   */
  handleSelectData = (data) => {
    const { pandascoreData } = this.state;
    pandascoreData[data].selected = !pandascoreData[data].selected
    this.setState({
      pandascoreData
    })
    this.state.pandascoreData.map(key => {
      if (key.selected) {
        this.state.selectedData.push(key);
      }
      return null;
    })

    // console.log(data);
    // let wishTeam = [...this.state.selectedData]
    //     wishTeam.push(data);
    //    let uniq = [...new Set(wishTeam)];
    // this.setState({
    //   selectedData : uniq
    // })
  }
/**
 * ThandleWatchList - this function is use to handle all selected condidate in sepetrate component form easy to access. 
 */
  handleWatchList = () => {
   
    var WatchListDataSend= {
      watchListData :[...new Set(this.state.selectedData)],
    }
    this.props.history.push('/watchlist', WatchListDataSend)
  }
/**
 * getData - this function is use to take response from back-end api
 */

  getData = () => {
  const indexOfLastPost = this.state.currentPage * this.state.rowPageRange;
  const indexOfFirstPost = indexOfLastPost - this.state.rowPageRange;
    getAllData()
      .then((res) => {
        var pandaDataSort1 = res.data;
        const currentPosts = pandaDataSort1.slice(indexOfFirstPost, indexOfLastPost)
        this.setState({
          pandascoreData : pandaDataSort1,
          currentDataDisplay : currentPosts,
        })
      })
      .catch((err) => {
        console.log("err occur while heating backend - api", err);
      });
  };

  handlePageChange= async(page) =>{
    console.log(page);
  await this.setState({
     currentPage : page
   })
   this.getData()
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/')
  }

  render() {
    this.state.pandascoreData.map(data => {
      return { ...data, selected: false };
    });
    const pandascoreTableTitle = this.state.columns.map(key => {
      return (
        <div className="Table_">
          <tr>
            <th >{key.name}</th>
            <th >{key.armor}</th>
            <th >{key.attackdamage}</th>
            <th >{key.attackrange}</th>
            <th >{key.hpperlevel}</th>
            <th >{key.spellblock}</th>
            <th >{key.action}</th>
          </tr>
        </div>
      )
    })
    const pandascoreTable = this.state.currentDataDisplay.slice(this.state.page * this.state.rowPerPage, this.state.page * this.state.rowPerPage + this.state.rowPerPage).map((key, index) => {
      return (
        <div className="Table_">
          <tr>
            <td onClick={() => this.handleAllDetail(key)}>{key.name}</td>
            <td >{key.armor}</td>
            <td >{key.attackdamage}</td>
            <td >{key.attackrange}</td>
            <td >{key.hpperlevel}</td>
            <td >{key.spellblock}</td>
            <td>{key.selected ? <Button variant="outlined" color="secondary" onClick={() => this.handleRemoveData(index)}>Remove</Button>: <Button variant="outlined" color="secondary" onClick={() => this.handleSelectData(index)}>Add</Button>}</td>
          </tr>
        </div>
      )
    })
    
    return (
      <Fragment>
        <Helmet><title>Pandascore - Dashboard</title></Helmet>
        <div id="dashboard-home">
          <section>
            <div className="dash">
              <div className="proj-name">
                <span className="name-1">Panda</span>
                <span className="name-2">
                  Score
                </span>
              </div>
              <div className="search"><input id="search-field" type="text" placeholder="Search..." onChange={this.handleChange_Serchbox}
                value={this.state.email} /></div>
              <div className="panda-div-1" >
                <div className="panda-div-2"
                  onClick={this.handleWatchList}> 
                  <span> Watch List</span>
                  <span className="badge">{[...new Set(this.state.selectedData)].length}</span>
                  </div>
                <div className="panda-div-2"
                  onClick={this.handleLogout}> Logout </div>
              </div>
            </div>
            {pandascoreTableTitle}
            {pandascoreTable}
        <Pagination 
        dataCount={this.state.pandascoreData.length} 
        pageSize={this.state.rowPageRange}
        onPageChange={this.handlePageChange}
        currentPage={this.state.currentPage}/>
              <Dialog
                fullScreen
                open={this.state.open}
                TransitionComponent={Transition}>
                <div id="dashboard-home"
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close">
                
                  {/**
                     *  @param   {nameData} nameData all champion data present here, and access from state.
                     */}
                  {this.state.nameData.map(key => {
                    return (
                      <div className="panda-div-5" style={{display:"flex"}}>
                        <div>
                          <img src={key.big_image_url} alt="champ img" />
                          <div className="panda-img">{key.name}</div>
                        </div>
                        {/*
                          * This is display all the details of champion player 
                          */}
                        <div className="panda-div-6" style={{display:"flex", justifyContent:"space-around"}}>
                          <div>
                            <div>Armor - {key.armor}</div>
                            <div>Armor Per Level - {key.armorperlevel}</div>
                            <div> Attack Damage - {key.attackdamage}</div>
                            <div>Attack Damage Per level - {key.attackdamageperlevel}</div>
                            <div> Attack Range - {key.attackrange}</div>
                            <div> Attack Speed Per Level - {key.attackspeedperlevel}</div>
                            <div>Crit - {key.crit}</div>
                          </div>

                          <div>
                            <div>Crit Per level - {key.critperlevel}</div>
                            <div> Hp - {key.hp}</div>
                            <div>Hpper level - {key.hpperlevel}</div>
                            <div> Hpregen - {key.hpregen}</div>
                            <div> Hpregen Per Level - {key.hpregenperlevel}</div>
                            <div>Move Speed - {key.movespeed}</div>
                            <div>Mp - {key.mp}</div>
                          </div>

                          <div>
                            <div> Mp Per Level - {key.mpperlevel}</div>
                            <div>Mpregen - {key.mpregen}</div>
                            <div>Mpregen Per Level - {key.mpregenperlevel}</div>
                            <div> Spell Block - {key.spellblock}</div>
                            <div>spell Block Per Level - {key.spellblockperlevel}</div>
                            <div>Video Game Version - {key.videogame_versions}</div>
                          </div>

                        </div>
                      </div>
                    )
                  })}
                </div>
              </Dialog>
          </section>
        </div>
      </Fragment>
    )
  }
}

export default dashboardcomponent;