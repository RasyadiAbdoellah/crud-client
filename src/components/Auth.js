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
      rememberMe: false,
      showError: false,
      errorMessage: ''
    };
  }

  // --------------EVENT HANDLERS------------------

  errorHandler = error => {
    this.setState({ showError: true, errorMessage: error });
    setTimeout(() => {
      this.setState({ showError: false });
    }, 2500);
  };

  changeHandler = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
  };

  toggleSignIn = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  //Post request to server is triggered here with results being passed up to parent

  submitAuth = event => {
    event.preventDefault();

    const { username, password, passConfirm, isSignIn } = this.state;

    //dynamic url based on isSignIn flag
    const routeOptions = { signIn: '/sign-in', signUp: '/sign-up' };
    const route = isSignIn ? routeOptions.signIn : routeOptions.signUp;

    //exit out of function early if the passwords don't match and send an alert
    if (!isSignIn && password !== passConfirm) {
      return this.errorHandler('passwords do not match');
    }

    axios
      .post(API_URL + route, { username, password })
      .then(res => {
        // if it's in sign up mode, automatically sign in
        if (!isSignIn) {
          return axios.post(API_URL + routeOptions.signIn, { username, password });
        }
        return res;
      })
      .then(res => {
        res.data.token = { Authorization: `Bearer ${res.data.token}` };
        // remember me determines whether auth goes to local or session storage
        if (this.state.rememberMe) {
          localStorage.setItem('user', JSON.stringify(res.data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(res.data));
        }

        //pass to parent
        this.props.authDataHandler(res.data);
      })
      .catch(err => {
        const message = err.response.data;
        this.errorHandler(message);
        //clear local user data because the backend borked. Should force the app to re-sign-in
        localStorage.clear()
        sessionStorage.clear()
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
                type='password'
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
                type='password'
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
