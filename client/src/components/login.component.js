import React, { Component, useEffect, useState } from "react";
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import loginIcon from "../assets/images/icons/login-icon.jpg";
import { Helmet } from 'react-helmet';

const TITLE = 'Login - Expense Manager'

function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:4200/users/login', { email: email.value, password: password.value }).then(response => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          props.history.push('/home');
        }).catch(error => {
          setLoading(false);
          if (error.response.status === 401) setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
        });
      }

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
                  <input type="email" {...email} className="form-control" placeholder="Enter email" />
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" {...password} className="form-control" placeholder="Enter password" />
              </div>

              {/* <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div> */}

              {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
              <input type="button" value={loading ? 'Loading...' : 'Login'} className="btn btn-primary btn-block" onClick={handleLogin} disabled={loading} />
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
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

export default Login;