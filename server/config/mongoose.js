// ////////////////////////////////////////
// // Mongoose Set Up
// ////////////////////////////////////////
// var mongoose = require('mongoose'),
// 	fs		 = require('fs'),
// 	path	 = require('path'),
// 	models_path = path.join( __dirname, '../models'),
// 	reg		 = new RegExp( ".js$", "i"),
// 	dbURI	 = 'mongodb://127.0.0.1:27017/inspection';

// ////////////////////////////////////////
// // Connection Events
// ////////////////////////////////////////

// mongoose.connect( dbURI );


// *  If the Node process ends, close the Mongoose connection
// */
// process.on( 'SIGINT', function() {
//   mongoose.connection.close( function () {
//     console.log( 'Mongoose default connection disconnected through app termination' );
//     process.exit( 0 );
//   });
// });


////////////////////////////////////////
// Require All model files
////////////////////////////////////////
// fs.readdirSync( models_path ).forEach( function( file ){
// 	if( reg.test( file ) ){
// 		require( path.join( models_path, file ) );
// 	}
// });