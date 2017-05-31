app.factory('ClientService', function($q, $http) {
    var clients = {};

    var formatData = function(arr){
    	keys = arr[0];
    	var returnArray = [];
    	var formattedData = {};
    	for(var i = 1; i < arr.length; i++){
        	formattedData = {};
        	for(var n = 0; n < keys.length; n++){
            	formattedData[keys[n]] = arr[i][n];
        	}
        	returnArray.push(formattedData);
    	}
    	return returnArray
    }


    ////////////////////////////////////////
    //Test for empty on object
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
    //Test for empty on object
    ////////////////////////////////////////



    return {
        list: function(spreadsheetID) {
            var deferred = $q.defer();
            if (isEmpty(clients)) {    // items array is empty so populate it and return list from server to controller

                var spreadsheet_id = spreadsheetID;
                var range_name = 'Clients!A1:I';
                var value_render_option = 'FORMATTED_VALUE';
                var dimension = 'ROWS';
                var params = {spreadsheetId:spreadsheet_id, range:range_name, valueRenderOption: value_render_option}
                
                gapi.client.sheets.spreadsheets.values.get(params).execute(function(response){
                    if(!response){
                        console.log("error");
                        return reject("error");
                    }
                    // Extract title from request
                    var title = response.range.split("!")[0]
                    var finalData = {};
                    finalData.title = title; 
                    finalData.data = formatData(response.values);
                    clients = finalData
                    deferred.resolve(clients)
                });


            } else {
                deferred.resolve(clients);   // items exist already so just return the array
            }
            return deferred.promise;
        },
        save: function(client) {
            return $http.post('/',{item:item}).then(function(response) {
                clients.data.push(client);
                return clients;
            });
        }


    }
});


