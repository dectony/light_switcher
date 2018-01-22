const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encryption = require('../utilities/encryption');


exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.deleteUser = function (req, res) {
    console.log("DELETE - /user/:id");
    //var condition = {_id: req.params.id};
    return User.findById(req.params.id, function(err, user) {
        if(!user) {
            res.statusCode = 404;
            return res.send({ error: 'User not found' });
        }

        return user.remove(function(err) {
            if(!err) {
                console.log('User was removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        })
    });
};

exports.createUser = function (req, res, next) {
    console.log(req.body);
    const userData = req.body;
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
};