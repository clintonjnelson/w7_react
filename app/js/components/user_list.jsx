'use strict';
// this displays users and emails as a list

var React       = require('react'            );
var Email       = require('./email.jsx'      );
var Description = require('./description.jsx');

// Needs to take an array of users, so it can break down into list

// UserList Component
module.exports = React.createClass({
  render: function() {
    // need to grab info out of EACH user and make jsx format with it
    // we're creating a new array of jsx entries to send to return
    var peopleArray = this.props.data.map(function(user, index) {
      // don't build the outer portion YET
      // specify lower Component and what to pass it. that's what we are doing here
      // can also display things in html by using {user.variable}
      return (
        <aside key={index}>
          <Email email={user.email}/>
          <Description description={user.description}/>
        </aside>
      );
    });
    // wrap the inner element sets in this overall outer Parent element
    return (
      <section className="userList">
        {peopleArray}
      </section>
    );
  }
});
