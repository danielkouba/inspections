app.factory('SpreadsheetService', function($q, $http, cmAuthService, cmApiService, googleClient) {
    var spreadsheet = {}



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
            if (isEmpty(spreadsheet)) {    // items array is empty so populate it and return list from server to controller
                var driveOptions = {
                      'maxResults': 10,
                      'orderBy': 'modifiedByMeDate desc',
                      'q': 'title = "ALI - Lift Inspection"'
                    };
                googleClient.afterApiLoaded().then(function(){
                    // when the above promise is resolved, I'm sure that GAPI il correctly loaded
                    // so here I can use GAPI (essentially is what cmApiService does)
                    gapi.client.drive.files.list(driveOptions).execute(function(resp){
                        spreadsheet = resp.items[0];
                        deferred.resolve(spreadsheet)

                  });
                });
            } else {
                deferred.resolve(spreadsheet);   // items exist already so just return the array
            }
            return deferred.promise;
        },
        save: function(spread) {
            spreadsheet = spread;
            return spreadsheet;
        }


    }
});


