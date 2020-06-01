const mongoose = require('mongoose'),
    passport = require('passport'),
    auth = require('./auth'),
    users = require('../controllers/users'),
    houses = require('../controllers/houses'),
    rooms = require('../controllers/rooms'),
    devices = require('../controllers/devices'),
    User = mongoose.model('User'),
    upload = require('../config/multer').upload;

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        next();
    });

    app.post('/api/upload', upload.single('file'), function (req, res, next)
    {
        console.log(req.body);
        console.log(req.file);
    });

    //app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/users', passport.authenticate('jwt', { session: false }), users.getUsers);

    app.post('/api/users', users.createUser);
    app.delete('/api/users/:id', passport.authenticate('jwt', { session: false }), auth.requiresRole('admin'), users.deleteUser);



    app.post('/api/houses', houses.createHouse);
    app.get('/api/houses/:id', houses.getUserHouses);
    app.delete('/api/houses/:id', passport.authenticate('jwt', { session: false }), houses.deleteHouse);
    app.get('/api/house/:id', passport.authenticate('jwt', { session: false }), houses.getById);

    app.post('/api/rooms', rooms.addRoom);
    app.get('/api/rooms/:id', rooms.getRooms);
    app.delete('/api/rooms/:id', passport.authenticate('jwt', { session: false }), rooms.deleteRoom);
    app.get('/api/room/:id', passport.authenticate('jwt', { session: false }), rooms.getById);

    app.post('/api/devices', devices.addDevice);
    app.get('/api/devices/:id', devices.getHouseDevices);
    //app.delete('/api/rooms/:id', passport.authenticate('jwt', { session: false }), rooms.deleteRoom);
    app.get('/api/device/:id', passport.authenticate('jwt', { session: false }), devices.getById);
    app.put('/api/device/:id', passport.authenticate('jwt', { session: false }), devices.updateDeviceValue);

    app.post('/login', auth.authenticate);
    //app.post('/login', passport.authenticate('jwt', {session: false}), auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};