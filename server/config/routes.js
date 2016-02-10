//To get the controllers - save them in appropriate variables
var users = require('../controllers/users.js');


module.exports = function(app){
    app.post('/users/register', users.register);
    app.post('/users/login', users.login);
    app.get('/logout', users.logout);

    // app.get('/orders', orders.showall);
    // app.post('/orders/new', orders.create);
    // app.get('/orders/recent', orders.showrecent);

    // app.get('/products', products.showall);
    // app.post('/products/new', products.create);
    // app.get('/products/recent', products.showrecent);
    // app.get('/products/findbyid/:id', products.findbyid);
}