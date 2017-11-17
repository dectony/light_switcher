var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption')


var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    userName: {type: String, required: '{PATH} is required!', unique: true},
    salt: String,
    hashed_password: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    Authenticated: function (passwordToMatch) {
        return encryption.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
    },

    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
}

var User = mongoose.model('User', userSchema);

//default init
exports.createDefaultUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'dec');
            User.create({
                firstName: 'Anton',
                lastName: 'Zasenka',
                userName: 'dec',
                salt: salt,
                hashed_password: hash,
                roles: ['admin']
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'hex');
            User.create({
                firstName: 'Alex',
                lastName: 'Zasenka',
                userName: 'hex',
                salt: salt,
                hashed_password: hash,
                roles: []
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'ber');
            User.create({firstName: 'Irene', lastName: 'Zasenka', userName: 'ber', salt: salt, hashed_password: hash});
        }
    })
}

exports.UserModel = userSchema;