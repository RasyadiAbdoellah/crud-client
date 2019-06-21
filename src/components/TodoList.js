import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../config';
import Todo from './Todo';

const route = '/todos';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todosIsGetting: true,
      todosGetFailed: false,
      error: null,
      title: ''
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  newEntry = event => {
    event.preventDefault();

    axios
      .post(API_URL + route, { title: this.state.title }, { headers: this.props.user.token })
      .then(res => {
        const todos = this.state.todos;
        todos.push(res.data);
        console.log(res.data);
        this.setState({ todos });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateEntry = updateInfo => {
    console.log(updateInfo);
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
        console.log(err);
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
        console.log(err);
      });
  };

  //get request on mount. may move this to constructor
  componentDidMount() {
    axios
      .get(API_URL + route, {
        headers: this.props.user.token
      })
      .then(res => {
        this.setState({ todosIsGetting: false, todos: res.data });
      })
      .catch(err => {
        this.setState({ todosIsGetting: false, todosGetFailed: true, error: err.response });
      });
  }

  render() {
    const { todos, todosGetFailed, todosIsGetting, title } = this.state;
    return (
      <div>
        <form onSubmit={this.newEntry}>
          <label>Add a new entry</label>
          <input type='text' name='title' value={title} onChange={this.changeHandler} />
          <input type='submit' />
        </form>
        <div>
          <h2>Things I need to do</h2>
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
