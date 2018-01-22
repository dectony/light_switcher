const crypto = require('crypto');


exports.createSalt = function(){
    return crypto.randomBytes(128).toString('base64');
};

exports.hashPassword = function(salt, password){
    const hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
};