var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');



module.exports = {
    development: {
        db: 'mongodb://localhost/PR3',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        jwtSecret: 'secret',
        jwtSession: {
            session: false
        }

    },
    production: {

    }
}