const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');



module.exports = {
    development: {
        db: 'mongodb://localhost/mqttBroker',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        jwtSecret: 'secret',
        jwtSession: {
            session: false
        }

    },
    production: {

    }
};