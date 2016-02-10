var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


//create a schema called UserSchema
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    netbalance: Number,
    monthlytemplate: {type: Schema.Types.ObjectId, ref: 'MonthlyExpense'},
    history: [{type: Schema.Types.ObjectId, ref: 'MonthlyExpense'}],
    savinggoals: [{type: Schema.Types.ObjectId, ref: 'SavingGoal'}],
    created_at: Date
});

//Validations
// UserSchema.path('firstname').required(true, 'First name cannot be blank');
// UserSchema.path('lastname').required(true, 'Last name cannot be blank');
// UserSchema.path('email').required(true, 'Email name cannot be blank');
// UserSchema.path('password').required(true, 'Password cannot be blank');

UserSchema.plugin(passportLocalMongoose);

mongoose.model ('User', UserSchema); //set this schema as User in our model


