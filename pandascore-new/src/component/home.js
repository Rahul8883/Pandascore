import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'

/**
 * <Home - This function is landing page of this application.>
 * In this landing page there is two commond 
 * Login (ID : rr582619@gmail.com, Password : rahul@700)
 * Registration
 */

const Home = () => (
    <Fragment>
        <Helmet> <title>Quiz App -  Home</title></Helmet>
        <div id="home">
            <section>
                <div style={{ textAlign: "center" }}>
                    <img src={require('../assets/landingPageIcon.svg')} alt="tpglogo" style={{ width: "8rem", textAlign: "center", marginBottom: "3rem", marginTop: "3rem" }} />
                </div>
                <h1>Pandascore</h1>
                <h2 style={{ textAlign: "center", fontSize: "3rem" }}>The <span style={{ color: "#b300de" }}>esports</span>  data <span style={{ color: "#b300de" }}>API</span> </h2>
                <div className="auth-container">
                    <Link to="/login" className="auth-buttons" id="login-button">Login</Link>
                    <Link to="registration" className="auth-buttons" id="register-button">Register</Link>
                </div>
            </section>
        </div>
    </Fragment>
)
export default Home;