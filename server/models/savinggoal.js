var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema called SavingGoalSchema
var SavingGoalSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    required_by: Date,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: Date
});

//Validations
SavingGoalSchema.path('name').required(true, 'Name of saving goal cannot be blank');
SavingGoalSchema.path('amount').required(true, 'Amount cannot be blank');
SavingGoalSchema.path('required_by').required(true, 'Required by date cannot be blank');


mongoose.model ('SavingGoal', SavingGoalSchema); //set this schema as SavingGoal in our model