import React, { Component, Fragment } from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core/';
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import { userService } from '../service/user.services';
import Helmet from 'react-helmet';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmpassword: "",
            snackbarOpen: false,
            snackbarMsg: ""
        }
    }
    
    handlerField = (event, value) => {
        this.setState({[value] : event.target.value});
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }
    
    handleSubmit = () => {
        if (this.state.firstName === "") {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "first Name cann't be Empty..!"
            })
        } else if (this.state.lastName === "") {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Last Name cann't be Empty..!"
            })
        } else if (this.state.email === "") {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Email cann't be empty..!!"
            })
        } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            console.log("entered", /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email));
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Invalid Email..!"
            })
        } else if (this.state.password === "") {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Password cann't be empty..!!"
            })
        } else if (this.state.password.length < 6) {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "password must be of atleast 6 characters..!!"
            })
        } else {
            let data = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "service": "Basic",
                'email': this.state.email,
                'password': this.state.password
            }
            userService.userRegister(data).then((res) => {
                this.setState({ snackbarOpen: true,
                     snackbarMsg: "Registration done  successfully!!" 
                    })
                this.props.history.push('/login');
            }).catch(err => {
                console.log("err in login component ", JSON.stringify(err));
            })
        }
    }
    render() {
        return (
            <Fragment>
            <Helmet><title>Pandascore - Login</title></Helmet>
      <div id="registration-container">   
    <section>
                    <div className="registration-contents">
                       <div style={{textAlign:"center", color:"#c73c16", fontWeight:"bold", fontSize: 25, fontFamily: "TimesNewRoman"}}>PANDASCORE</div>
                        <div style={{textAlign:"center", color: "purple", fontSize: 25, fontFamily: "TimesNewRoman" }}>Create your pandaScore Account</div>
                        <div>
                            <div className="personal-filed">
                                <div>
                                    <TextField
                                        type="firstName"
                                        name="firstName"
                                        placeholder="firstName"
                                        id="standard-basic"
                                        label="First Name*"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        value={this.state.firstName}
                                        onChange={(e)=>this.handlerField(e, "firstName")}/>
                                </div>
                                <div>
                                    <TextField
                                        type="lastName"
                                        name="lastName"
                                        placeholder="lastName"
                                        id="standard-basic"
                                        label="Last Name*"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        value={this.state.lastName}
                                        onChange={(e)=>this.handlerField(e, "lastName")}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TextField
                                type="email"
                                name="email"
                                placeholder="Email"
                                id="standard-basic"
                                label="Email id*"
                                fullWidth
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e)=>this.handlerField(e, "email")}/>
                        </div>
                        <div className="password-field">
                            <div>
                                <TextField
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    id="standard-basic"
                                    label="Password*"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={(e)=>this.handlerField(e, "password")}/>
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    name="confirmpassword"
                                    placeholder="confirmpassword"
                                    id="standard-basic"
                                    label="Confirm Password*"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    value={this.state.confirmPassword}
                                    onChange={(e)=>this.handlerField(e, "confirmpassword")}/>
                            </div>
                        </div>
                        <div >
                            <div style={{ borderBottom: "1px solid", paddingBottom:"30px"}}>  
                            <Button
                            style={{backgroundColor:"#1da1f2"}}
                             fullWidth
                             type="submit"  onClick={this.handleSubmit}>
                             SignUp</Button>
                            </div>
                            <div style={{textAlign:"center", color:"green", cursor:"pointer"}} onClick={this.handleLogin}>SignIn instead</div>
                        </div>
                    </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={2000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}/>
            
            </section>
            </div>
            </Fragment>
        );
    }
}

export default withRouter(Registration)