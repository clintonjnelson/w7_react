'use strict';

var express     = require('express' );
var mongoose    = require('mongoose');
var usersRoutes = express.Router();     // make router
var app         = express();                    // make app/server via express
// Setup db & host to listen
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users_development');

// Require in routes from users_routes & pass usersRouter to populate
require('./routes/users_routes')(usersRoutes);

// Assign base route & Router of subroutes to app
app.use('/api', usersRoutes);
app.use(express.static(__dirname + '/build')); // resources for Client Side

// Start server on env port or default 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});









