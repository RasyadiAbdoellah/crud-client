import React, { Component } from 'react';
import Auth from './Auth';
import UserActions from './UserActions';
import TodoList from './TodoList';

export default class App extends Component {
  constructor(props) {
    super(props);

    let isAuth, user;
    if (sessionStorage.length !== 0) {
      user = JSON.parse(sessionStorage.getItem('user'));
    }
    if (localStorage.length !== 0) {
      user = JSON.parse(localStorage.getItem('user'));
    }

    isAuth = user ? true : false;

    this.state = {
      isAuth,
      user,
      message: '',
      showMessage: false
    };
  }

  errorHandler = message => {
    this.setState({ message: message, showMessage: true });
    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 2500);
  };

  //auth data lives here so both auth and useractions components have access to it
  authDataHandler = data => {
    this.setState({ isAuth: true, user: data });
  };

  //signout handler clears state. local and session storage clearing happen in useractions component
  signOutHandler = (error = false) => {
    this.setState({
      isAuth: false,
      user: null
    });
    //if called because of an error
    if (error) {
      this.errorHandler('Something went wrong! please try signing in again');
    }
  };

  render() {
    const { isAuth, user, message } = this.state;
    return (
      <div className='container'>
        <div
          className={'box is-outlined is-fullwidth ' + this.state.showMessage ? '' : 'is-hidden'}
        >
          <p className='has-text-danger'>{message}</p>
        </div>
        <div className='columns is-8 is-variable is-centered is-vcentered'>
          {!isAuth ? (
            <div className='column is-two-fifths'>
              <Auth authDataHandler={this.authDataHandler} signOutHandler={this.signOutHandler} />
            </div>
          ) : (
            <>
              <div className='column is-one-fifth'>
                <UserActions user={user} signOutHandler={this.signOutHandler} />
              </div>
              <div className='column'>
                <TodoList user={user} signOutHandler={this.signOutHandler} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
