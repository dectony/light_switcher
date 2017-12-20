var mongoose = require('mongoose'),
    passport = require('passport'),
    auth = require('./auth'),
    users = require('../controllers/users'),
    cars = require('../controllers/cars'),
    houses = require('../controllers/houses'),
    bids = require('../controllers/bids'),
    User = mongoose.model('User'),
    upload = require('../config/multer').upload;

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        console.log(req.params);
        res.render('../../Public/app/' + req.params[0])
    });

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
    })

    //app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/users', passport.authenticate('jwt', { session: false }), users.getUsers);

    app.post('/api/users', users.createUser);
    app.delete('/api/users/:id', passport.authenticate('jwt', { session: false }), users.deleteUser);

    app.get('/api/cars', cars.getCars);
    app.get('/api/cars/:id', cars.getCarById);
    app.post('/api/cars', cars.addCar);
    app.put('/api/cars/:id', cars.updateCar);
    app.delete('/api/cars/:id', cars.deleteCar);

    app.post('/api/houses', houses.createHouse);
    app.get('/api/houses/:id', houses.getUserHouses);
    app.delete('/api/houses/:id', passport.authenticate('jwt', { session: false }), houses.deleteHouse);
    app.get('/api/house/:id', passport.authenticate('jwt', { session: false }), houses.getById);

    // app.get('/api/auctions', auctions.getAuctions);
    // app.get('/api/auctions/:id', auctions.getAuctionById);
    // app.get('/api/auctions/:createdBy', auctions.getAuctionsByUser);
    // app.post('/api/auctions', auctions.addAuction);
    // app.put('/api/auctions/:id', auctions.updateAuction);
    // app.delete('/api/auctions/:id', auctions.deleteAuction);

    app.get('/api/bids', bids.getBidsByAuction);
    app.get('/api/bids/:id', bids.getLastBidByAuction);
    app.post('/api/bids', bids.addBid);
    app.delete('/api/bids/:id', bids.deleteBid);

    app.post('/login', auth.authenticate);
    //app.post('/login', passport.authenticate('jwt', {session: false}), auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    })

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}