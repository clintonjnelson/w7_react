'use strict';
/***
This is where we make the MAIN React App (top level)
We will bring the next-level child components into here
We will also render the App from here
***/

var React      = require('react'                     );
var request    = require('superagent'                );
var UserForm   = require('./components/user_form.jsx');
var UserList   = require('./components/user_list.jsx');

var App = React.createClass({
  getInitialState: function() {
    // this happens before server hit, so site can get up & running
    return {data: [{email: 'email', description: 'description'}]};
  },
  componentDidMount: function() {
    // if loaded, grab data from server
    this.loadServerData();
    // set an interval for running a function. Call time directly or set at bottom as props variable.
    // setInterval(this.loadServerData, 2000);
  },
  submitUser: function(user, callback) {   // Passes the data to function
    console.log("USER IS: ", user);
    request
      .post('/api/users', user)
      .end(function postUser(err, res) {
        if (err) {
          console.log('Error: ', err);
          callback(false);     // takes true/false to determine if to clear inputs
        }
        // Could manually merge this into state & update more quickly
        this.loadServerData(); // sets the state with updated server data
        callback(true);
      }.bind(this));           // takes true/false to determine if to clear inputs
  },
  loadServerData: function() {
    var that = this;
    // hits server and sets the state
    request
      .get('/api/users')
      .end(function getUsersResponse(err, res) {
        console.log("Error: ", err, "BODY: ", res.body);
        if(err) { return console.log("Error getting users: ", err); }
        this.setState({data: res.body});
      }.bind(this));  // bind to this, so can call "this" inside function & get App context
  },
  render: function() {
    // Set up the app. Need initial state data to pass down through app
    // remember to set the data by passing state data returned above
    // <section className="app">
    //     <h1>Users:</h1>
    //     <UserList data={this.state.data} />
    //   </section>
    return (
      <section className="app">
        <h1>Users:</h1>
        <UserList data={this.state.data} />
        <hr/>
        <UserForm submitUser={this.submitUser} buttonText='create user' />
      </section>
      );
  }
});

// render the Main Component & tell React where to put it in DOM
React.render( <App />, document.getElementById('main') );
