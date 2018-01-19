var express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';

var config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/mongoose')(config);
require('./config/passport')(config);
require('./config/routes')(app);
require('./config/mosca')(config);
//require('./config/jwt')(config);
var myJWT  = require('./config/jwt')(config);




//var messageSchema = mongoose.Schema({message:String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//    mongoMessage = messageDoc.message;
//});





app.listen(config.port);
console.log('Listening on port' + config.port + '...');

