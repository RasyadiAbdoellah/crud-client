import React, { Component } from 'react';
import Auth from './Auth';
import axios from 'axios';
import API_URL from '../config';

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

  signOut = () => {
    axios
      .delete(API_URL + '/sign-out', {
        headers: { Authorization: `Bearer ${this.state.user.token}` }
      })
      .then(res => {
        console.log(res);
        this.setState({
          isAuth: false,
          user: null
        });
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
        {isAuth && <button onClick={this.signOut}> Sign out</button>}
      </div>
    );
  }
}
