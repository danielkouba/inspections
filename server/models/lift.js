var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

////////////////////////////////////////
// User Model
////////////////////////////////////////

var liftSchema = new mongoose.Schema({
	name:     			{type: String, required: true, trim: true},
	model:     			{type: String, required: true, trim: true},
	type: 	  			{type: String, required: true, trim: true},
	_inspections:      [{type: Schema.Types.ObjectId, ref: 'Inspection'}],
	_owner: 	   		{type: Schema.Types.ObjectId, ref: 'User'}
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

mongoose.model('Lift', liftSchema); 