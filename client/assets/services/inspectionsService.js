app.factory('InspectionsService', function($q, $http, SpreadsheetService) {
    var inspections = {};

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

        var formKeys = ["searchText", "selectedItem", "noCache", "lift_owner", "address", "city", "state", "zipcode", "email", "phone", "fax", "address_cont", "operator", "employee_id", "searchLift", "selectedLift", "lift_manufacturer", "lift_model", "mfg_serial", "lift_capacity", "lift_certified", "ali_certification", "lift_type", "lift_design", "inspector_certified", "inspector_name", "inspector_id", "inspection_date", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "completed", "status"]

        var formatForm = function(data){
            var valueArray = [];
            for (var i = 0; i < formKeys.length; i++){
                if(!data[formKeys[i]]){
                    valueArray.push("");
                } else if (typeof data[formKeys[i]] == "object"){
                    valueArray.push(data[formKeys[i]].pass)
                } else {
                    valueArray.push(data[formKeys[i]]);
                }
            }
            return valueArray
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
            if (isEmpty(inspections)) {    // items array is empty so populate it and return list from server to controller

                var spreadsheet_id = spreadsheetID;
                var range_name = 'Inspections!A1:Z';
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
                    inspections = finalData
                    deferred.resolve(inspections)
                });
            } else {
                deferred.resolve(inspections);   // items exist already so just return the array
            }
            return deferred.promise;
        },
        save: function(inspection) {
            console.log(inspection)
            var deferred = $q.defer();
            SpreadsheetService.list().then(function(result){
                console.log(result);
                console.log("success!")
                var spreadsheet_id = result.id;
                var range_name = 'Inspections!A2:B';
                var dimension = 'ROWS';
                var value_input_option =  'USER_ENTERED';
                var values = [formatForm(inspection)];
                var params = {spreadsheetId:spreadsheet_id, range:range_name, valueInputOption:value_input_option, values:values};
                gapi.client.sheets.spreadsheets.values.append(params).execute(function(response){
                    if(!response){
                        deferred.reject("error")
                    }
                    deferred.resolve(response);
            });
                return deferred.promise
            },function(reason){
                console.log("fail")
            })
            
           return deferred.promise 
        }


    }
});


