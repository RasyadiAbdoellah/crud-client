import React, { Component } from 'react';
import Auth from './Auth';
import UserActions from './UserActions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      user: null,
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
        {!isAuth && <Auth authDataHandler={this.authDataHandler} />}
        {isAuth && <UserActions user={user} signOutHandler={this.signOutHandler} />}
      </div>
    );
  }
}
