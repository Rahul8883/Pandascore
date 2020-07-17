import React, { Component, Fragment } from "react";
import { getAllData, getSearchResult } from "../service/user.services";
import CloseIcon from "@material-ui/icons/Close";
import Helmet from "react-helmet";
import { Slide, Button,} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export class dashboardcomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pandascoreData: [],
      count: 1,
      selectedData: [],
      columns: [
        { name: "Name", armor: "Armor", attackdamage: "Attack Damage", attackrange: "Attack Range", hpperlevel: "Hpper level", spellblock: "Spell Block", action: "Action" },
      ],
      open: false,
      nameData: [],
      email: "",
      page: 0,
      rowPerPage: 10,
    };
  }
  componentDidMount() {
    this.getData();
  }
  /**
   * This function is use to seach the champ according to your entry data.
   */
  handleChange_Serchbox = event => {
    const email = event.target.value;
    this.setState({ email });
    console.log("event occur in search field", this.state.email);
    getSearchResult(this.state.email).then(res => {
      console.log("Response occur while heating search back-end Api", res.data);
      this.setState({
        pandascoreData: res.data
      })
    }).catch(err => {
      console.log("err occr", err);
    })
  }
  /**
   * <handleAllDetail This function is use to know all details of the champ>
   * @param {data} data this is discribe all the details of the selected candiadte
   */
  handleAllDetail = (data) => {
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
    console.log("onclick counting", this.state.count);
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
    var data = {
      watchlist: this.state.selectedData
    }
    this.props.history.push('/dashboard/watchlist', data)

  }
/**
 * getData - this function is use to take response from back-end api
 */
  getData = () => {
    /**
     * heating back-end API here and get response
     */
    getAllData(this.state.count)
      .then((res) => {
        this.setState({
          pandascoreData: res.data,
        })
        console.log("response coming from back-end api", this.state.pandascoreData);
      })
      .catch((err) => {
        console.log("err occur while heating backend - api", err);
      });
  };

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
    const pandascoreTable = this.state.pandascoreData.slice(this.state.page * this.state.rowPerPage, this.state.page * this.state.rowPerPage + this.state.rowPerPage).map((key, index) => {
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
            <div className="panda-div-3">
              <Button variant="contained" color="inherit" onClick={this.handlePrevious}>Previous</Button>
              <Button variant="contained" color="primary" onClick={this.handleNext}>Next</Button>
            </div>

            {/**
               * Dialogue box, after clicking on Name it will display details of champion.
               */}
            <div>
              <Dialog
                fullScreen
                open={this.state.open}
                TransitionComponent={Transition}>
                <div id="dashboard-home"
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close">
                  <div className="panda-div-4">
                    <div className="proj-name">
                      <span className="name-1">Panda</span>
                      <span className="name-2">
                        Score
                </span>
                    </div>
                    <div className="closeicon">
                      <div> <CloseIcon onClose={this.handleClose} /> </div>
                    </div>
                  </div>
                  {/**
                     *  @param   {nameData} nameData all champion data present here, and access from state.
                     */}
                  {this.state.nameData.map(key => {
                    return (
                      <div className="panda-div-5">
                        <div>
                          <img src={key.big_image_url} alt="champ img" />
                          <div className="panda-img">{key.name}</div>
                        </div>
                        {/*
                          * This is display all the details of champion player 
                          */}
                        <div className="panda-div-6">
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
            </div>

          </section>
        </div>
      </Fragment>
    )
  }
}

export default dashboardcomponent;
