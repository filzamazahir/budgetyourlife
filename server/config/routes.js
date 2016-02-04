//To get the controllers - save them in appropriate variables
var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');
var products = require('../controllers/products.js');

module.exports = function(app, passport){

    app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/dashboard', failureFlash: true}));


    // app.get ('/customers', customers.showall);  //Display all customers 
    // app.get('/customers/findonebyname/:name', customers.findbyname);
    // app.post('/customers/new/', customers.create);    //   C - Add a person to the collection
    // app.delete('/customers/remove/:id', customers.remove); // D - Delete a particular person
    // app.get('/customers/recent', customers.showrecent);

    // app.get('/orders', orders.showall);
    // app.post('/orders/new', orders.create);
    // app.get('/orders/recent', orders.showrecent);

    // app.get('/products', products.showall);
    // app.post('/products/new', products.create);
    // app.get('/products/recent', products.showrecent);
    // app.get('/products/findbyid/:id', products.findbyid);
}