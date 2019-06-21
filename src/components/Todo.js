import React, { Component } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      value: this.props.content
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleHandler = key => {
    this.setState({ [key]: !this.state[key] });
  };

  submitUpdate = event => {
    event.preventDefault();

    this.props.updateHandler({
      change: this.state.value,
      id: this.props.id
    });
    this.toggleHandler('editable');
  };
  deletion = () => {
    this.props.deleteHandler(this.props.id);
  };

  render() {
    const { value, editable } = this.state;
    const { id, content } = this.props;
    return (
      <div>
        {!editable ? (
          <p id={id}>{content}</p>
        ) : (
          <form onSubmit={this.submitUpdate}>
            <input type='text' name='value' value={value} onChange={this.changeHandler} />
            <input type='submit' />
          </form>
        )}
        <button onClick={() => this.toggleHandler('editable')}>
          {editable ? 'cancel' : 'edit'}
        </button>
        <button onClick={this.deletion}>delete</button>
      </div>
    );
  }
}
