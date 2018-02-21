const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

require('./utils/mongoose')(config);
require('./utils/ws').Initialize();
require('./utils/mosca')();