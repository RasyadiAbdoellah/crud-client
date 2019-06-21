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

  toggleEdit = () => {
    this.setState({ value: this.props.content, editable: !this.state.editable });
  };

  submitUpdate = event => {
    event.preventDefault();

    this.props.updateHandler({
      change: this.state.value,
      id: this.props.id
    });
    this.toggleEdit();
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
        <button onClick={this.toggleEdit}>{editable ? 'cancel' : 'edit'}</button>
        {!editable && <button onClick={this.deletion}>delete</button>}
      </div>
    );
  }
}
