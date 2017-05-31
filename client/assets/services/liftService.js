app.factory('LiftService', function($q, $http) {
    var lifts = [];

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


    return {
        list: function(spreadsheetID) {
            var deferred = $q.defer();
            if (lifts.length == 0) {    // items array is empty so populate it and return list from server to controller

                var spreadsheet_id = spreadsheetID;
                var range_name = 'Lifts!A1:E';
                var value_render_option = 'FORMATTED_VALUE';
                var dimension = 'ROWS';
                // var value_input_option =  'USER_ENTERED';
                // var values = [["COOL BOSS","HV900", , "High FIVE"]];
                var params = {spreadsheetId:spreadsheet_id, range:range_name, valueRenderOption: value_render_option}
                gapi.client.sheets.spreadsheets.values.get(params).execute(function(response){
                    if(!response){
                        console.log("error");
                        return reject("error");
                    }
                    console.log("This is the response")
                    console.log(response);
                    // Extract title from request
                    var title = response.range.split("!")[0]
                    var finalData = {};
                    finalData.title = title; 
                    finalData.data = formatData(response.values);
                    deferred.resolve(finalData)
                });


            } else {
                deferred.resolve(items);   // items exist already so just return the array
            }
            return deferred.promise;
        },
        save: function(lift) {
            return $http.post('/',{item:item}).then(function(response) {
                lifts.push(lift);
                return lifts;
            });
        }


    }
});


