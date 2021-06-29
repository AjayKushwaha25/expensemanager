import React, { Component } from "react";
import { Link  } from 'react-router-dom'
import loginIcon from "../assets/images/icons/login-icon.jpg";
import { Helmet } from 'react-helmet'

const TITLE = 'Register - Expense Manager'

export default class SignUp extends Component {
    render() {
        return (
            <div>
                
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
            <form>
            {/* <div className="iconDiv">
              <img src={loginIcon} className="loginIcon"/>
            </div> */}
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" placeholder="Enter Phone Number" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already have an account? <Link to={"/login"}>Login </Link>
                </p>
            </form>
            </div>
        );
    }
}