var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

////////////////////////////////////////
// User Model
////////////////////////////////////////

var liftSchema = new mongoose.Schema({
	model:     			{type: String, trim: true},
	serial:     		{type: String, trim: true},
	type: 	  			{type: String, trim: true},
	capacity: 	  		{type: String, trim: true},
	manufacturer: 	  	{type: String, trim: true},
	_inspections:      [{type: Schema.Types.ObjectId, ref: 'Inspection'}],
	_owner: 	   		{type: Schema.Types.ObjectId, ref: 'User'}
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

mongoose.model('Lift', liftSchema); 