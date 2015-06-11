'use strict';

var React  = require('react' );

// EMAIL
module.exports = React.createClass({
  render: function() {
    // ALWAYS add a classname for what you're inserting into html
    return (
      <p className="email">
        Email: <em>{ this.props.email }</em>
      </p>
    );
  }
});
