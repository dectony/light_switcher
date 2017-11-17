var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');



module.exports = {
    development: {
        db: 'mongodb://localhost/PR3',
        rootPath: rootPath,
        port: process.env.PORT || 3030

    },
    production: {
        db: 'mongodb://dectony:5145muZZle.pr3@ds015869.mlab.com:15869/pr3',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}