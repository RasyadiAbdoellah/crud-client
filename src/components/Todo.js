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

  //rather than pass auth data down two levels so that the API request lives here, it seems easier to pass data the entire function down and call it with the appropriate data frome here.
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
        {editable && (
          <form onSubmit={this.submitUpdate}>
            <div className='field has-addons'>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  name='value'
                  value={value}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='control'>
                <input className='button is-outlined is-primary' type='submit' />
              </div>
            </div>
          </form>
        )}

        {!editable && (
          <>
            <p className='is-size-4' id={id}>
              {content}
            </p>
            <button className='button is-outlined is-danger' onClick={this.deletion}>
              delete
            </button>
          </>
        )}

        <button className='button is-outlined is-info' onClick={this.toggleEdit}>
          {editable ? 'cancel' : 'edit'}
        </button>
      </div>
    );
  }
}
