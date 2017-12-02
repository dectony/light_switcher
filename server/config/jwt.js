var jwt = require('jwt-simple');

module.exports = function(config) {
    return {
            getToken: function(userId) {
                return jwt.encode({id: userId}, config.jwtSecret);
            }
        }
};