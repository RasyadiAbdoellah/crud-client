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
    return <div>This is an app</div>;
  }
}
