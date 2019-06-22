import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { clearIf500 } from '../helpers';

//User actions is its own component to help with readability
export default class UserActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passConfirm: '',
      newPassword: '',
      alertMessage: '',
      showMessage: false,
      isError: false
    };
  }

  // ---------------- EVENT HANDLERS ------------------

  // general alert handler that manipulates flags that determine if message is visible and what colour it should be
  alertHandler = (message, error = false) => {
    this.setState({ alertMessage: message, showMessage: true, isError: error ? true : false });
    setTimeout(() => {
      this.setState({ showMessage: false, isError: false });
    }, 2500);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // axios patch is done here. similar flow as sign in
  changPw = event => {
    const { passConfirm, newPassword } = this.state;
    event.preventDefault();

    if (passConfirm !== newPassword) {
      return this.alertHandler('Passwords do not match', true);
    }
    axios
      .patch(
        API_URL + '/change-pass',
        { passConfirm, newPassword },
        { headers: this.props.user.token }
      )
      .then(() => {
        this.setState({
          newPassword: '',
          passConfirm: ''
        });
        this.alertHandler('Password Successfully changed');
      })
      .catch(err => {
        console.error(err);
        const message = err.response ? err.response.data : 'Something went wrong';
        this.alertHandler(message, true);
        //clear local user data because the backend borked. Should force the app to re-sign-in
        if (clearIf500(err)) {
          this.props.signOutHandler(true);
        }
      });
  };

  // sign out clears local and session before API call to prevent possible stale token
  signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    axios
      .delete(API_URL + '/sign-out', {
        headers: this.props.user.token
      })
      .then(res => {
        this.props.signOutHandler();
      })
      .catch(err => {
        console.error(err);
        const message = err.response ? err.response.data : 'Something went wrong';
        this.alertHandler(message);
        //clear local user data because the backend borked. Should force the app to re-sign-in
        if (clearIf500(err)) {
          this.props.signOutHandler(true);
        }
      });
  };

  //----------------- RENDER-------------------
  render() {
    const { passConfirm, newPassword, showMessage, alertMessage, isError } = this.state;
    return (
      <div>
        <form className='my-3' onSubmit={this.changPw}>
          <div className='field'>
            <label className='label'>Change Password</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                type='password'
                name='newPassword'
                value={newPassword}
                placeholder='New password'
                onChange={this.changeHandler}
              />
            </div>
            <div className='control'>
              <input
                className='input'
                type='text'
                type='password'
                name='passConfirm'
                value={passConfirm}
                placeholder='Confirm new password'
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <input
            className='button is-fullwidth is-outlined is-info'
            type='submit'
            value='Change Password'
          />
        </form>
        <button className='button is-fullwidth is-outlined is-danger' onClick={this.signOut}>
          Sign out
        </button>
        {showMessage && (
          <p className={isError ? 'has-text-danger' : 'has-text-info'}>{alertMessage}</p>
        )}
      </div>
    );
  }
}
