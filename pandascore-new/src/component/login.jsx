import React, { Component, Fragment } from 'react'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button } from "@material-ui/core";
import { userAction } from '../action/user.action';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

/**
 * <function description>
 * @param   {state} state <this parameter is use to take all value from  Reducer>
 * @return  {state}     <and return that value in component for further use>
 */

function mapState(state) {
  console.log("state info in Login component", state);
  return { state }
}
/**
 * javaSCript object making for action creater.
 */
const actionCraeter = {
  login: userAction.login
}

export class login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }
/**
 * These function is use for event occur in text field
 */
  handleChange_email = event => {
    const email = event.target.value;
    this.setState({ email });
  }
  handleChange_password = event => {
    const password = event.target.value;
    this.setState({ password });
  }
/**
 * This function is use to submit all the data which is submited from user end and hit the backend part.
 */
  handleSubmit = () => {
    let _loginData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(_loginData)
  }

  render() {
    return (
        <Fragment>
            <Helmet><title>Pandascore - Login</title></Helmet>
      <div id="login-container">
       
    <section>
        <div className="login-box">
          <div className="login_">
            <h2>Login</h2>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <div className="field_"> Email
                        <TextValidator
                            className="field"
                            placeholder="Email"
                            onChange={this.handleChange_email}
                            value={this.state.email}
                            variant="outlined"
                            fullWidth
                            validators={["required", "isEmail"]}
                            errorMessages={["this field is required", "email is not valid"]} />
              </div>
              <div className="_field"> Password
                        <TextValidator  
                            className="field"
                            placeholder="Password"
                            onChange={this.handleChange_password}
                            type="password"
                            variant="outlined"
                            fullWidth
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                            value={this.state.password} />
              </div>
              <div className="login-main">
                <Button className="login-button" fullWidth type="submit">
                  Login
                      </Button></div>
              <div className="register-button">Create Account</div>
            </ValidatorForm>
          </div>
        </div>
    </section>
      </div>
      </Fragment>
    )
  }
}

export default connect(mapState, actionCraeter)(login)
