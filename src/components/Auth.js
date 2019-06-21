import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../config';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: true,
      username: '',
      password: '',
      passConfirm: ''
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleSignIn = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  submitAuth = event => {
    event.preventDefault();

    const { username, password, isSignIn } = this.state;

    const routeOptions = { signIn: '/sign-in', signUp: '/sign-up' };
    const route = isSignIn ? routeOptions.signIn : routeOptions.signUp;

    axios
      .post(API_URL + route, { username, password })
      .then(res => {
        if (!isSignIn) {
          return axios.post(API_URL + routeOptions.signIn, { username, password });
        }
        return res;
      })
      .then(res => {
        res.data.token = { Authorization: `Bearer ${res.data.token}` };
        this.props.authDataHandler(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    const { isSignIn, username, password, passConfirm } = this.state;
    return (
      <div>
        <form onSubmit={this.submitAuth}>
          {isSignIn ? (
            <>
              <label>Sign in</label>
              <input
                name='username'
                placeholder='Enter username'
                value={username}
                onChange={this.changeHandler}
              />
              <input
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={this.changeHandler}
              />
            </>
          ) : (
            <>
              <label>Register</label>
              <input
                name='username'
                placeholder='Enter username'
                value={username}
                onChange={this.changeHandler}
              />
              <input
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={this.changeHandler}
              />
              <input
                name='passConfirm'
                placeholder='Confirm password'
                value={passConfirm}
                onChange={this.changeHandler}
              />
            </>
          )}
          <input type='submit' />
        </form>

        <button onClick={this.toggleSignIn}>{isSignIn ? 'Register' : 'Sign in'}</button>
      </div>
    );
  }
}
