const express = require('express');

const app = express();
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/mongoose')(config);
require('./config/passport')(config);
require('./config/routes')(app);
require('./config/mosca')(config);
//require('./config/jwt')(config);
var myJWT  = require('./config/jwt')(config);


app.listen(config.port);
console.log('Listening on port' + config.port + '...');

