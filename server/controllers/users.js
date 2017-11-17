var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encryption = require('../utilities/encryption');


exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
}

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.userName = userData.userName.toLowerCase();
    userData.salt = encryption.createSalt();
    userData.hashed_password = encryption.hashPassword(userData.salt, userData.password);

    User.create(userData, function(err, user){
        if(err){
            if(err.toString().indexOf('E11000') > 1){
                err = new Error('Duplicate user');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function (err) {
            if(err){
                return next(err);
            }else{
                return res.send(user);
            }
        });
    })
}