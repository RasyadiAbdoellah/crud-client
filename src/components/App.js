import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      token: null
    };
  }

  render() {
    // COMPONENTS TO BUILD
    // auth component that sends token up to top level component on login
    // To-do Component that displays, creates, updates, and deletes owned resources
    // To-do Item component. A direct child of To-do and CRUDS the to-do items
    // Client-side session logic
    return <div>This is an app</div>;
  }
}
