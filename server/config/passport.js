var mongoose = require('mongoose'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    jwt = require("jwt-simple");

    localStrategy  = require('passport-local').Strategy;
    User = mongoose.model('User');

var JwtStrategy  = passportJWT.Strategy;
var extractJWT = passportJWT.ExtractJwt;


module.exports = function(config){
    var params = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
    };
    var strategy = new JwtStrategy(params, function(payload, done){
        User.findOne({userName:payload.username}).exec(function(err, user){
            if(user && user.Authenticated(payload.password)){
                return done(null, user);
            }else{
                return done(null, false)
            }
        })
    });
    passport.use(strategy);

    passport.use(new localStrategy(function(username, password, done){
        User.findOne({userName:username}).exec(function(err, user){
            if(user && user.Authenticated(password)){
                return done(null, user);
            }else{
                return done(null, false)
            }
        })}));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
});
    //
    // return {
    //     initialize: function() {
    //         return passport.initialize();
    //     },
    //     authenticate: function() {
    //         return passport.authenticate("jwt", config.jwtSession);
    //     }
    // }

};