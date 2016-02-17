var mongoose = require('mongoose');
var MonthlyExpense = mongoose.model('MonthlyExpense');

module.exports = {

    showall: function(req, res){
        MonthlyExpense.find({}).populate('customer').populate('product').exec(function(err, monthlyexpenses){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(monthlyexpenses);
            }
        });
    },

    create: function(req, res){
        var monthlyexpense = new MonthlyExpense({quantity: req.body.qty, created_at: new Date()});
        monthlyexpense.customer = req.body.user._id;
        monthlyexpense.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add person");
            }
            else {
                console.log('Monthly Expense added successfully');
                MonthlyExpense.update({_id:  req.body.product._id}, {$inc: {quantity: -req.body.qty}}, function (err, product_updated){
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
        MonthlyExpense.find({}).sort({created_at: -1}).limit(3).populate('customer').populate('product').exec(function(err, recent_monthlyexpenses){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_monthlyexpenses);
            }
        });


    }

}