import React, { Component } from "react";
import { Link  } from 'react-router-dom'
import loginIcon from "../assets/images/icons/login-icon.jpg";
import { Helmet } from 'react-helmet'

const TITLE = 'Login - Expense Manager'

export default class Login extends Component {
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
              <h3>Welcome</h3>

              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" />
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" />
              </div>

              <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              <p className="sign-up float-left">
                  Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
              </p>
              <p className="forgot-password float-right">
                  Forgot <Link to={"#"}>password?</Link>
              </p>
          </form>
          </div>
      );
  }
}