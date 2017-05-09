var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

////////////////////////////////////////
// User Model
////////////////////////////////////////

var userSchema = new mongoose.Schema({
	email:    			{type: String, required: true, trim: true, unique:true},
	name:     			{type: String, required: true, trim: true},
	company:     		{type: String, required: true, trim: true},
	password: 			{type: String, required: true, trim: true},
	address:  			{type: String, required: true, trim: true},
	city:  				{type: String, required: true, trim: true},
	state:    			{type: String, required: true, trim: true},
	zip_code: 			{type: String, required: true, trim: true},
	type: 	  			{type: String, required: true, trim: true},
	inspector_id: 		{type: String, trim: true},
	ali_certification: 	{type: String, trim: true},
	resetPassword: 		{type: Boolean, default: false},
	_inspections:      [{type: Schema.Types.ObjectId, ref: 'Inspection'}],
	_lifts:      [{type: Schema.Types.ObjectId, ref: 'Lift'}],
	_customers: 	   [{type: Schema.Types.ObjectId, ref: 'User'}]
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});
userSchema.plugin(uniqueValidator);
userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});

mongoose.model('User', userSchema); 