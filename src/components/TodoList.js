import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../config';
import Todo from './Todo';

import { clearIf500 } from '../helpers';

const route = '/todos';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todosIsGetting: true,
      todosGetFailed: false,
      alertMessage: '',
      title: '',
      isError: false
    };
  }
  alertHandler = (message, error = false) => {
    this.setState({ alertMessage: message, showMessage: true, isError: error ? true : false });
    setTimeout(() => {
      this.setState({ showMessage: false, isError: false });
    }, 2500);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Unlike auth and user actions, todolist does not send data up because todos don't need to be a global object.
  newEntry = event => {
    event.preventDefault();
    if (this.state.title.length === 0) {
      this.alertHandler('Entry cannot be empty', true);
    }
    axios
      .post(API_URL + route, { title: this.state.title }, { headers: this.props.user.token })
      .then(res => {
        const todos = this.state.todos;
        todos.push(res.data);
        this.setState({ todos });
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

  //update and delete handlers are actually called from the child todo component. Having the child pass in info for these functions to process makes the most sense in my head
  updateEntry = updateInfo => {
    axios
      .patch(
        API_URL + route + '/' + updateInfo.id,
        { title: updateInfo.change },
        { headers: this.props.user.token }
      )
      .then(() => {
        const { todos } = this.state;
        const index = todos.findIndex(e => e.id === updateInfo.id);
        todos[index] = Object.assign({}, todos[index], { title: updateInfo.change });
        this.setState({ todos });
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

  deleteEntry = id => {
    axios
      .delete(API_URL + route + '/' + id, { headers: this.props.user.token })
      .then(() => {
        const { todos } = this.state;
        const index = todos.findIndex(e => e.id === id);
        todos.splice(index, 1);
        this.setState({ todos });
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

  //get request on mount. This, combined with session/local storage allows a refresh to refetch data. may move this to constructor
  componentDidMount() {
    axios
      .get(API_URL + route, {
        headers: this.props.user.token
      })
      .then(res => {
        this.setState({ todosIsGetting: false, todos: res.data });
      })
      .catch(err => {
        this.setState({ todosIsGetting: false, todosGetFailed: true });
        console.error(err);
        if (clearIf500(err)) {
          this.props.signOutHandler(true);
        }
      });
  }

  render() {
    const {
      todos,
      todosGetFailed,
      todosIsGetting,
      title,
      showMessage,
      alertMessage,
      isError
    } = this.state;
    return (
      <div className='container mt-3'>
        <h1 className='title'>Things I need to do</h1>
        <form className='mb-3' onSubmit={this.newEntry}>
          <div className='field'>
            <label className='label'>Add a new entry</label>
            <div className='field has-addons'>
              <div className='control'>
                <input
                  required
                  className='input'
                  type='text'
                  name='title'
                  value={title}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='control' />
              <button className='button is-outlined is-primary' type='submit'>
                Add
              </button>
            </div>
            {showMessage && (
              <p className={'help ' + (isError ? 'is-danger' : 'is-info')}>{alertMessage}</p>
            )}
          </div>
        </form>
        <div>
          {todosIsGetting ? (
            <p>Loading...</p>
          ) : todosGetFailed ? (
            <p>Something went wrong! try refreshing</p>
          ) : (
            todos.map((e, i) => {
              return (
                <Todo
                  key={i}
                  id={e.id}
                  content={e.title}
                  updateHandler={this.updateEntry}
                  deleteHandler={this.deleteEntry}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}
