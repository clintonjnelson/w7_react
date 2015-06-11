'use strict';

var React   = require('react'     );
var request = require('superagent');

module.exports = React.createClass({
  formSubmitHandler: function(event) {
    // onSubmit passes event into the provided callback
    // Do this locally, because it's specific to THIS FORM
    event.preventDefault(); // keep from submitting to the action

    // find values from DOM based on event sent
    // refs refers to the references in THIS component
    var username    = React.findDOMNode(this.refs.username   ).value.trim();
    var email       = React.findDOMNode(this.refs.email      ).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();

    // request back at top level, since data needs to flow down
    // make sure to pass object in format for post
    this.props.submitUser({ username: username, email: email, description: description }, function(success) {
      if (success) {
        React.findDOMNode(this.refs.username   ).value = '';
        React.findDOMNode(this.refs.email      ).value = '';
        React.findDOMNode(this.refs.description).value = '';
      }
    }.bind(this));
  },
  render: function() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        <label htmlFor="Username:">Username: </label>
        <input type="text" ref='username' />
        <label htmlFor="Email:">Email: </label>
        <input type="text" ref='email' />
        <label htmlFor="Description:">Description: </label>
        <input type="text" ref='description' />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
});
