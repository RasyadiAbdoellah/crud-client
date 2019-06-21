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
      todos: []
    };
  }

  authDataHandler = data => {
    this.setState({ isAuth: true, user: data });
  };

  signOutHandler = () => {
    this.setState({
      isAuth: false,
      user: null
    });
  };

  render() {
    const { isAuth, user } = this.state;
    // COMPONENTS TO BUILD
    // auth component that sends token up to top level component on login
    // To-do Component that displays, creates, updates, and deletes owned resources
    // To-do Item component. A direct child of To-do and CRUDS the to-do items
    // Client-side session logic
    return (
      <div>
        {!isAuth ? (
          <div>
            <Auth authDataHandler={this.authDataHandler} />
          </div>
        ) : (
          <div>
            <UserActions user={user} signOutHandler={this.signOutHandler} />
            <TodoList user={user} />
          </div>
        )}
      </div>
    );
  }
}
