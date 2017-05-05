var mongoose = require('mongoose');
var Schema = mongoose.Schema;

////////////////////////////////////////
// Inspection Model
////////////////////////////////////////
var inspectionSchema = new mongoose.Schema({
	address: {type:String, trim: true},
	address_cont: {type:String, trim: true},
	ali_certification: {type:String, trim: true},
	c1: {pass: String},
	c2: {pass: String},
	c3: {pass: String},
	c4: {pass: String},
	c5: {pass: String},
	c6: {pass: String},
	c7: {pass: String},
	c8: {pass: String},
	c9: {pass: String},
	c10: {pass: String},
	c11: {pass: String},
	c12: {pass: String},
	c13: {pass: String},
	c14: {pass: String},
	c15: {pass: String},
	c16: {pass: String},
	c17: {pass: String},
	c18: {pass: String},
	c19: {pass: String},
	c20: {pass: String},
	c21: {pass: String},
	c22: {pass: String},
	c23: {pass: String},
	c24: {pass: String},
	c25: {pass: String},
	c26: {pass: String},
	c27: {pass: String},
	c28: {pass: String},
	city: {type:String, trim: true},
	completed: {type: Boolean, default: false},
	_company: {type: Schema.Types.ObjectId, ref: 'User'},
	d1: {pass: String},
	d2: {pass: String},
	d3: {pass: String},
	d4: {pass: String},
	d5: {pass: String},
	d6: {pass: String},
	d7: {pass: String},
	d8: {pass: String},
	email: {type:String, trim: true},
	employee_id: {type:String, trim: true},
	fax: {type:String, trim: true},
	inspection_date: {type:String, trim: true},  //Date
	inspector_certified: {type:String, trim: true}, //Bool
	inspector_id: {type:String, trim: true},
	inspector_name: {type:String, trim: true},
	_inspector: {type: Schema.Types.ObjectId, ref: 'User'},
	lift_capacity: {type:String, trim: true}, //Number
	lift_certified: {type:String, trim: true}, //Bool
	lift_design: {type:String, trim: true},
	lift_manufacturer: {type:String, trim: true},
	lift_model: {type:String, trim: true},
	lift_owner: {type:String, trim: true},
	lift_type: {type:String, trim: true},
	mfg_serial: {type:String, trim: true},
	operator: {type:String, trim: true},
	phone: {type:String, trim: true},
	state: {type:String, trim: true},
	status: {type:String, trim: true},
	zipcode: {type:String, trim: true}

},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

mongoose.model('Inspection', inspectionSchema); 