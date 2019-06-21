import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../config';

export default class UserActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: ''
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changPw = event => {
    const { oldPassword, newPassword } = this.state;
    event.preventDefault();
    axios
      .patch(
        API_URL + '/change-pass',
        { oldPassword, newPassword },
        { headers: this.props.user.token }
      )
      .then(() => {
        this.setState({
          oldPassword: '',
          newPassword: ''
        });
        //do something to show success
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    axios
      .delete(API_URL + '/sign-out', {
        headers: this.props.user.token
      })
      .then(res => {
        console.log(res);
        //do something to show success
        this.props.signOutHandler();
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
  render() {
    const { oldPassword, newPassword } = this.state;
    return (
      <div>
        <form onSubmit={this.changPw}>
          <input type='text' name='oldPassword' value={oldPassword} onChange={this.changeHandler} />
          <input type='text' name='newPassword' value={newPassword} onChange={this.changeHandler} />
          <input type='submit' value='Change Password' />
        </form>
        <button onClick={this.signOut}> Sign out</button>
      </div>
    );
  }
}
