import React, { Component, Fragment } from "react";
import { getAllData, getSearchResult } from "../service/user.services";
import Helmet from "react-helmet";
import { Slide, Button,} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Pagination from '../component/pagination';
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// const paginate = numberFromPagination => setCurrentPage(numberFromPagination);
// Pagination.paginate=(data)=>{
// console.log(data);

// }


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
      openWatchListData :false,
      nameData: [],
      page: 0,
      rowPerPage: 10,
      watchListData :"",
      watchListCount : "",
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
    }
    
  componentDidMount() {
    this.getData();    
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
   * This is use to handle next button.
   */
  handleNext = () => {
    this.setState({
      count: this.state.count + 1
    })
    this.getData();
  }
  /**
   * This is use to handle previous button.
   */
  handlePrevious = () => {
    this.setState({
      count: this.state.count - 1
    })
    this.getData();
  }
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
  }
/**
 * ThandleWatchList - this function is use to handle all selected condidate in sepetrate component form easy to access. 
 */
  handleWatchList = () => {
    var unquie = this.state.selectedData;
    var data = [...new Set(unquie)]
    var count1 = data.length
    this.setState({
      watchListCount : count1,
      watchListData : data,
      openWatchListData : true
    })
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
        console.log(pandaDataSort1);
        
        pandaDataSort1.sort(function (x, y) {
          let a = x.name.toUpperCase(),
              b = y.name.toUpperCase();
          return a === b ? 0 : a > b ? 1 : -1;
        });
        const currentPosts = pandaDataSort1.slice(indexOfFirstPost, indexOfLastPost)

        //change page  
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
            <td >{key.selected ? <img src={require('../assets/check.svg')} alt="tpglogo" /> : <Button variant="outlined" color="secondary" onClick={() => this.handleSelectData(index)}>Add</Button>}</td>
          </tr>
        </div>
      )
    })
    
    return (
      <Fragment>
        <Helmet><title>Pandascore - Dashboard</title></Helmet>

{!this.state.openWatchListData ? 
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
                  onClick={this.handleWatchList}> Watch List </div>
                <div className="panda-div-2"
                  onClick={this.handleLogout}> Logout </div>
              </div>
            </div>

            {pandascoreTableTitle}
            {pandascoreTable}

            {/* <Pagination postsPerpage={this.state.rowPageRange} totalPosts ={this.state.pandascoreData.length}
              //  paginate={paginate}
             /> */}


<Pagination 
        dataCount={this.state.pandascoreData.length} 
        pageSize={this.state.rowPageRange}
        onPageChange={this.handlePageChange}
        currentPage={this.state.currentPage} />


            {/* <div className="panda-div-3">
              <Button variant="contained" color="inherit" onClick={this.handlePrevious}>Previous</Button>
              <Button variant="contained" color="primary" onClick={this.handleNext}>Next</Button>   
            </div> */}
          

            {/**
               * Dialogue box, after clicking on Name it will display details of champion.
               */}
            {/* <div> */}
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
            {/* </div> */}

          </section>
        </div>
:
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
              <td><Button style={{color : "red"}} onClick={() => this.handleRemoveData(index)}>Remove</Button></td>
            </tr>
          </table>
        </div>
      )
    })
  }
</section>
</div>
  }

      </Fragment>
    )
  }
}

export default dashboardcomponent;
