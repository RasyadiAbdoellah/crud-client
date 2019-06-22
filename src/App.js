import React, { Component } from 'react';
import Auth from './components/Auth';
import UserActions from './components/UserActions';
import TodoList from './components/TodoList';

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
      user
    };
  }

  //auth data lives here so both auth and useractions components have access to it
  authDataHandler = data => {
    this.setState({ isAuth: true, user: data });
  };

  //signout handler clears state. local and session storage clearing happen in useractions component
  signOutHandler = () => {
    this.setState({
      isAuth: false,
      user: null
    });
  };

  render() {
    const { isAuth, user } = this.state;
    return (
      <div className='container'>
        <div className='columns is-8 is-variable is-centered is-vcentered'>
          {!isAuth ? (
            <div className='column is-two-fifths'>
              <Auth authDataHandler={this.authDataHandler} />
            </div>
          ) : (
            <>
              <div className='column is-one-fifth'>
                <UserActions user={user} signOutHandler={this.signOutHandler} />
              </div>
              <div className='column'>
                <TodoList user={user} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
