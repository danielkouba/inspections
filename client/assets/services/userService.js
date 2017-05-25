app.service('UserService', function () {
  var _id = '';
  var _title = '';

  this.getData = function () {
    return {
    	'id': _id,
    	'title': _title
    };
  }
  this.setData = function(id, title){
  	_id = id;
  	_title = title;
  }
});