import {withRouter} from 'react-router-dom';
import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import Helmet from "react-helmet";
import { getAllData, getSearchResult } from '../service/user.services';
import { Table } from 'semantic-ui-react'
import Pagination from '../component/pagination';
import { Dialog, Slide } from '@material-ui/core';
function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
 class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            column: null,
            pandascore: [],
            direction: null,
            currentPage : 1,
            rowPageRange: 10,
            currentPageOfChamp : [],
            champDetail : [],
            open: false,
            AddedChampion : [],
            watchListCount : "",
            addSelect : ""
          }
    }
    componentDidMount(){
        this.getData()
        if (this.props.location.state) {
            this.setState({
                AddedChampion: this.props.location.state,
                addSelect : this.props.location.state 
            })
          }
    }
    getData = ()=>{
        const indexOfLastPost = this.state.currentPage * this.state.rowPageRange;
        const indexOfFirstPost = indexOfLastPost - this.state.rowPageRange;
        getAllData().then(res=>{
            let ChampResponse = res.data
            const currentPosts = ChampResponse.slice(indexOfFirstPost, indexOfLastPost)
            this.setState({
                pandascore : ChampResponse,
                currentPageOfChamp : currentPosts
            })
        })
    }

    handleChange_Serchbox = (event) => {
        try {
            const indexOfLastPost = this.state.currentPage * this.state.rowPageRange;
            const indexOfFirstPost = indexOfLastPost - this.state.rowPageRange;
          const searchData = event.target.value;
          getSearchResult(searchData).then(res => {
            var pandaDataSort = res.data;
            const currentPosts = pandaDataSort.slice(indexOfFirstPost, indexOfLastPost)
            this.setState({
                currentPageOfChamp : currentPosts
            })
          }).catch(err => {
            console.log("err occr", err);
          })
        } catch (error) {
          console.log(error); 
        } 
      }


  handleSort = clickedColumn => () => {
    const { column, currentPageOfChamp, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        currentPageOfChamp: _.sortBy(currentPageOfChamp, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }
    this.setState({
        currentPageOfChamp: currentPageOfChamp.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }
  handlePageChange= async(page) =>{
    console.log(page);
  await this.setState({
     currentPage : page
   })
   this.getData()
  }
  handleAllDetail = async(data)=>{
    this.setState({
        open: true,
      })
      this.state.champDetail.push(data)
  }
  handleClose=()=>{
      this.setState({
          open : false
      })
      window.location.reload(false);
  }






  handleRemoveData = (data) => {
    const { AddedChampion } = this.state;
      for(var i = 0; i < AddedChampion.length; i++){
        if(AddedChampion[i]===data){
          AddedChampion.slice(i, 1)
        }
        this.setState({
          AddedChampion
        })
      }


    // this.state.AddedChampion.splice(data, 1);
    // this.setState({
    //   AddedChampion,
    // })
  }
  
  handleSelectData=(data)=>{      
    const { pandascore } = this.state;
    pandascore[data].selected = !pandascore[data].selected
    this.setState({
        pandascore
    })
    this.state.pandascore.map(key => {
      if (key.selected) {
        console.log(key.selected);
        this.setState({
          addSelect : key.selected
        }, console.log(this.state.addSelect)
        )
        
        this.state.AddedChampion.push(key);
      }
      return null;
    })
   
  }
  handleWatchList = () => {
    var WatchListDataSend= {
      watchListData : [...new Set(this.state.AddedChampion)],
      valueSelected :this.state.addSelect
    }
    console.log(WatchListDataSend);
    
    this.props.history.push('/watchlist', WatchListDataSend)
  }
  handleLogout =()=>{
    localStorage.clear()
    this.props.history.push('/')
  }
  render() {
    const { column, currentPageOfChamp, direction } = this.state
    return (
        <Fragment>
        <Helmet><title>Pandascore - Dashboard</title></Helmet>
        <div id="dashboard-home">
          <section>
          <ul className="dash">
              <li className="proj-name">PandaScore</li>
              <li className="search"><input id="search-field" type="text" placeholder="Search..." onChange={this.handleChange_Serchbox}
                  value={this.state.email} /></li>
              <li className="panda-div-1" >
                <button className="panda-div-2"
                        onClick={this.handleWatchList}> 
                  <span> Watch List</span>
                  <span className="badge">{[...new Set(this.state.AddedChampion)].length}</span>
                </button>
                <button className="panda-div-2" onClick={this.handleLogout}>Logout</button>
              </li>
            </ul>
            <Table sortable celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === 'name' ? direction : null}
                    onClick={this.handleSort('name')}
                  >
                    Name
                  </Table.HeaderCell>
                  
                  <Table.HeaderCell
                    sorted={column === 'armor' ? direction : null}
                    onClick={this.handleSort('armor')}
                  >
                    Armor
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'attackdamage' ? direction : null}
                    onClick={this.handleSort('attackdamage')}
                  >
                  Attack Damage
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'attackrange' ? direction : null}
                    onClick={this.handleSort('attackrange')}
                  >
                  Attack Range
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'hpperlevel' ? direction : null}
                    onClick={this.handleSort('hpperlevel')}
                  >
                  Hpper Level
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'spellblock' ? direction : null}
                    onClick={this.handleSort('spellblock')}
                  >
                  Spell Block
                  </Table.HeaderCell>

                  <Table.HeaderCell>
                    Watch List
                  </Table.HeaderCell>
                
                </Table.Row>
              </Table.Header>
              {currentPageOfChamp.map((key, index)=>{
                  return(
                    <Table.Row key={key.name}>
                    <Table.Cell  onClick={() => this.handleAllDetail(key)}>{key.name}</Table.Cell>
                    <Table.Cell>{key.armor}</Table.Cell>
                    <Table.Cell>{key.attackdamage}</Table.Cell>
                    <Table.Cell>{key.attackrange}</Table.Cell>
                    <Table.Cell>{key.hpperlevel}</Table.Cell>
                    <Table.Cell>{key.spellblock}</Table.Cell>
                    <Table.Cell>
                      {key.selected  ? 
                      <button className="addButton" onClick={() =>
                        this.handleRemoveData(key)}>Remove</button>
                        : <button className="addButton" onClick={() => 
                          this.handleSelectData(index)}>Add </button>}
                    </Table.Cell>
                  </Table.Row>
                  )
              })}
            </Table>
            <Pagination 
              dataCount={this.state.pandascore.length} 
              pageSize={this.state.rowPageRange}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}/>
            <Dialog
              fullScreen
              open={this.state.open}
              onClick ={ this.handleClose}
              TransitionComponent={Transition}>  
                  {this.state.champDetail.map(key => {
                    return (
                      <ul className="panda-div-5" style={{display:"flex"}}>
                        <li>
                          <img src={key.big_image_url} alt="champ img" />
                          <h2 className="panda-img">{key.name}</h2>
                        </li>
                        <li className="panda-div-6" style={{display:"flex", justifyContent:"space-around"}}>
                          <ul>
                            <li>Armor - {key.armor}</li>
                            <li>Armor Per Level - {key.armorperlevel}</li>
                            <li> Attack Damage - {key.attackdamage}</li>
                            <li>Attack Damage Per level - {key.attackdamageperlevel}</li>
                            <li> Attack Range - {key.attackrange}</li>
                            <li> Attack Speed Per Level - {key.attackspeedperlevel}</li>
                            <li>Crit - {key.crit}</li>
                          </ul>

                          <ul>
                            <li>Crit Per level - {key.critperlevel}</li>
                            <li> Hp - {key.hp}</li>
                            <li>Hpper level - {key.hpperlevel}</li>
                            <li> Hpregen - {key.hpregen}</li>
                            <li> Hpregen Per Level - {key.hpregenperlevel}</li>
                            <li>Move Speed - {key.movespeed}</li>
                            <li>Mp - {key.mp}</li>
                          </ul>

                          <ul>
                            <li> Mp Per Level - {key.mpperlevel}</li>
                            <li>Mpregen - {key.mpregen}</li>
                            <li>Mpregen Per Level - {key.mpregenperlevel}</li>
                            <li> Spell Block - {key.spellblock}</li>
                            <li>spell Block Per Level - {key.spellblockperlevel}</li>
                            <li>Video Game Version - {key.videogame_versions}</li>
                          </ul>
                
                        </li>
                      </ul>
                    )
                  })}
              </Dialog>
      </section>
      </div>
      </Fragment>
    )
  }
}
export default withRouter(dashboard)