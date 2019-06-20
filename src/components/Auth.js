import React, { Component } from 'react';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: false,
      username: '',
      password: '',
      passConfirm: ''
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleSignIn = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  render() {
    const { isSignIn, username, password, passConfirm } = this.state;
    return (
      <div>
        <form>
          {isSignIn ? (
            <>
              <label>Sign in</label>
              <input
                name='username'
                placeholder='Enter username'
                value={username}
                onChange={this.changeHandler}
              />
              <input
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={this.changeHandler}
              />
            </>
          ) : (
            <>
              <label>Sign up</label>
              <input
                name='username'
                placeholder='Enter username'
                value={username}
                onChange={this.changeHandler}
              />
              <input
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={this.changeHandler}
              />
              <input
                name='passConfirm'
                placeholder='Confirm password'
                value={passConfirm}
                onChange={this.changeHandler}
              />
            </>
          )}
          <input type='submit' />
        </form>

        <button onClick={this.toggleSignIn}>{isSignIn ? 'Sign up' : 'Sign in'}</button>
      </div>
    );
  }
}
