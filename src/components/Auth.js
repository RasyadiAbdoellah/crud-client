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
      passConfirm: '',
      remeberMe: false,
      showError: false,
      errorMessage: ''
    };
  }

  errorHandler = error => {
    this.setState({ showError: true, errorMessage: error });
    setTimeout(() => {
      this.setState({ showError: false });
    }, 2500);
  };

  //EVENT HANDLERS
  changeHandler = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
  };

  toggleSignIn = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  //Post request to server is done here with results being passed up
  submitAuth = event => {
    event.preventDefault();

    const { username, password, passConfirm, isSignIn } = this.state;

    const routeOptions = { signIn: '/sign-in', signUp: '/sign-up' };
    const route = isSignIn ? routeOptions.signIn : routeOptions.signUp;

    if (!isSignIn && password !== passConfirm) {
      this.errorHandler('passwords do not match');
      return null;
    }

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
        if (this.state.rememberMe) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        sessionStorage.setItem('user', JSON.stringify(res.data));
        this.props.authDataHandler(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
        const message = err.response.data;
        this.errorHandler(message);
      });
  };

  render() {
    const { isSignIn, username, password, passConfirm, errorMessage, showError } = this.state;
    return (
      <div className='section'>
        <form className='mb-2' onSubmit={this.submitAuth}>
          <div className='field'>
            <label className='label'>{isSignIn ? 'Sign in' : 'Sign up'}</label>
            <div className='control'>
              <input
                required
                className='input'
                name='username'
                placeholder='Enter username'
                value={username}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <input
                required
                className='input'
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          {!isSignIn && (
            <div className='field'>
              <input
                required
                className='input'
                name='passConfirm'
                placeholder='Confirm password'
                value={passConfirm}
                onChange={this.changeHandler}
              />
            </div>
          )}
          <label className='checkbox'>
            <input name='rememberMe' type='checkbox' onChange={this.changeHandler} />
            Remember me
          </label>
          <div className='field'>
            <div className='control'>
              <input className='button is-primary is-fullwidth' type='submit' />
            </div>
          </div>
          {showError && <p className='has-text-danger is-centered'>{errorMessage}</p>}
        </form>

        <button className='button is-secondary is-fullwidth' onClick={this.toggleSignIn}>
          {isSignIn ? 'Register' : 'Sign in'}
        </button>
      </div>
    );
  }
}
