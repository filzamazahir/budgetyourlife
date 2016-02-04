var mongoose = require('mongoose');
var Order = mongoose.model ('Order');  
var Product = mongoose.model('Product');

module.exports = {

    showall: function(req, res){
        Order.find({}).populate('customer').populate('product').exec(function(err, orders){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(orders);
            }
        });
    },

    create: function(req, res){
        var order = new Order({quantity: req.body.qty, created_at: new Date()});
        order.customer = req.body.customer._id;
        order.product = req.body.product._id;
        order.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add person");
            }
            else {
                console.log('Order placed successfully');
                Product.update({_id:  req.body.product._id}, {$inc: {quantity: -req.body.qty}}, function (err, product_updated){
                    if (err){
                        console.log("Error in updating quantity");
                    }
                    else {
                        console.log ("Quantity updated successfully!"); 
                        res.end();
                    }
                });
            }
        });
    },

    showrecent: function (req, res) {
        Order.find({}).sort({created_at: -1}).limit(3).populate('customer').populate('product').exec(function(err, recent_orders){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_orders);
            }
        });


    }

}