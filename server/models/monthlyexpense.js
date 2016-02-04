var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema called MonthlyExpenseSchema
var MonthlyExpenseSchema = new mongoose.Schema({
    month: String,
    weekly_income: Number,
    biweekly_income: Number,
    monthly_income: Number,
    fixed_expense: [{String: Number}],
    variable_expense: [{String: Number}],
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: Date

    

});

//Validations

mongoose.model ('MonthlyExpense', MonthlyExpenseSchema); //set this schema as MonthlyExpense in our model