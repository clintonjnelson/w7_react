'use strict';

var React = require('react');

// Description
module.exports = React.createClass({
  render: function() {
    return (<p className="description">{ this.props.description }</p>);
  }
});
