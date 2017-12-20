var passport = require('passport');
var jwt = require('jwt-simple');
   // myJWT = require('../config/jwt')();

exports.authenticate = function (req, res, next) {
    console.log(req.body);
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('no user');
            res.send({success: false})
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            var token  = jwt.encode({id: user._id}, 'secret');
            //var token  = myJWT.getToken(user._id);
            user = user.toObject();
            res.send({success: true, user: {...user, token: token}});

        })
    });

    auth(req, res, next);
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
            next();
        }
        else {
            res.status(403);
            res.end();
        }
    }
}