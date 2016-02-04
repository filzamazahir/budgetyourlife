var mongoose = require('mongoose');
var Customer = mongoose.model ('Customer');  

module.exports = {

    showall: function(req, res){
        Customer.find({}, function (err, customers){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(customers);
            }
        });
    },

    findbyname: function(req,res) {
        Customer.findOne({name: req.params.name}, function(err, customer) {
            if (err) {
                console.log("Error retreiving a customer by name");
            }
            else {
                res.json(customer);
            }
        });
    },

    create: function(req, res){
        var customer = new Customer({name: req.body.name, created_at: new Date()});
        customer.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add person");
            }
            else {
                console.log ("Customer added successfully!"); 
                res.json(data_added);
            }
            
        });
    },

    remove: function (req, res) {
        Customer.remove({_id: req.params.id}, function (err, status){
            if (err){
                console.log("Error: Could not delete");
            }
            else {
                console.log("Customer deleted successfully");
                res.end();
            }
        });
    },

    showrecent: function(req, res) {
        Customer.find({}).sort({created_at: -1}).limit(3).exec(function(err, recent_customers){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_customers);
            }
        });
    }

}

