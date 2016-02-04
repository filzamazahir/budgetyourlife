var mongoose = require('mongoose');
var Product = mongoose.model ('Product');  

module.exports = {

    showall: function(req, res){
        Product.find({}, function (err, products){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(products);
            }
        });
    },

    create: function(req, res){
        var product = new Product({name: req.body.name, image_url: req.body.image_url, description: req.body.description, quantity: req.body.quantity, created_at: new Date()});
        product.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add product");
            }
            else {
                console.log ("Product added successfully!"); 
                res.json(data_added);
            }
            
        });
    },

    showrecent: function (req, res) {
        Product.find({}).sort({created_at: -1}).limit(5).exec(function(err, recent_products){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_products);
            }
        });
    },

    findbyid: function (req, res) {
        Product.findOne({_id: req.params.id}, function (err, product){
            if (err) {
                console.log("Error: could not retrieve product");
            }
            else {
                res.json(product);
            }
        })

    }

}