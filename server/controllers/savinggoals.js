var mongoose = require('mongoose');
var SavingGoal = mongoose.model ('SavingGoal');  

module.exports = {

    showall: function(req, res){
        SavingGoal.find({}, function (err, savinggoals){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                res.json(savinggoals);
            }
        });
    },

    create: function(req, res){
        var savinggoal = new SavingGoal({name: req.body.name, image_url: req.body.image_url, description: req.body.description, quantity: req.body.quantity, created_at: new Date()});
        savinggoal.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add savinggoal");
            }
            else {
                console.log ("Saving Goal added successfully!"); 
                res.json(data_added);
            }
            
        });
    },

    showrecent: function (req, res) {
        SavingGoal.find({}).sort({created_at: -1}).limit(5).exec(function(err, recent_savinggoals){
            if(err) {
                console.log('Error: Could not retrieve data');
            }
            else {
                res.json(recent_savinggoals);
            }
        });
    },

    findbyid: function (req, res) {
        SavingGoal.findOne({_id: req.params.id}, function (err, savinggoal){
            if (err) {
                console.log("Error: could not retrieve saving goal");
            }
            else {
                res.json(savinggoal);
            }
        })

    }

}