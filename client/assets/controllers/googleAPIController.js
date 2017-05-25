// app.controller('googleAPIController', function ($scope, $location, userFactory) {
app.controller('googleAPIController', ['$scope', 'googleService', '$location', 'userFactory', 'UserService', function ($scope, googleService, $location, userFactory, UserService) {
      // These are the two control buttons, default display none
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');



    console.log("******************************")
    console.log("googleAPIController")
    console.log("******************************")



    /**
    *  On load, called to load the auth2 library and API client library.
    */
    $scope.handleClientLoad = function() {
        console.log('handleClientLoad')
        gapi.load('client:auth2', googleService.initClient);
        console.log('Finished handleClientLoad')
    }
    /**
    *  Sign in the user upon button click.
    */
    $scope.handleAuthClick = function(event) {
        googleService.handleAuthClick(event);
        $location.url('/dashboard/inspector');
    }   
    
    /**
    *  Sign out the user upon button click.
    */
    $scope.handleSignoutClick = function(event) {
        googleService.handleSignoutClick(event);
    }

    /**
    *  Get all sheets
    */
    $scope.getSpreadsheets = function(){
        $scope.sheets = googleService.getSpreadsheets()
    }



    ////////////////////////////////////////
    //Get all 
    ////////////////////////////////////////
    $scope.checkSheets = function(){
        var promise = googleService.checkSheets();
        promise.then(function(result){
            console.log("Successfully got Sheets")
            console.log(result)
        },function(reason){
            console.log("There was an error")
            console.log(reason)
        })
    }



    ////////////////////////////////////////
    // Get all Spreadsheets
    $scope.getSheets = function(){
        gapi.client.request({
            path:  'https://www.googleapis.com/drive/v2/files'
        }).then(function(response) {
            // console.log(response.result);
            console.log(response);
            var range = response.result.items;
            return range;
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    };

    ////////////////////////////////////////
    // Create a new Spread Sheet
    $scope.createSheet = function(){
        if(!$scope.sheetTitle){
            $scope.sheetTitle = "Inspectorsheet";
        }
        data = {properties: {title: $scope.sheetTitle}};
        sheet = gapi.client.sheets.spreadsheets.create(body=data).execute(function(err, response){
            if (err) {
              console.log(err);
            }
            response = JSON.parse(response);
            duplicateSheet(response[0].result.spreadsheetId);
        });
    };

    // This duplicates the Inspector sheet
    var duplicateSheet= function(copyToID) {
        //Create request
        var request = {
            spreadsheetId: '1xtHRRYTc2IwzLwbgFzBLq_J_v4PgcUHTIAogfkA5Z2k',
            sheetId: 1969539565,
            resource: {
                title: "Inspector Sheet",
                destinationSpreadsheetId: copyToID
            }
        };
        // Perform request
        gapi.client.sheets.spreadsheets.sheets.copyTo(body = request).execute( function(err, resp){
            if (err){
                console.log("There was an error:");
                console.log(err);
                return;
            }

            console.log('Success');
        });
    };


    // Append a value to a spreadsheet of a a certain name
    $scope.addValue = function(){
        // Find all sheets
        var sheet;
        for(i = 0; i < $scope.sheets.length; i+=1){
            sheet = $scope.sheets[i];
            // Enter the name of the sheet you want to find here
            if (sheet.title == "Untitled spreadsheet"){
                $scope.editing = sheet.id;
            }
        }
        // Create request
        var spreadsheet_id = $scope.editing;
        var range_name = 'Clients!A2:B';
        var dimension = 'ROWS';
        var value_input_option =  'USER_ENTERED';
        var values = [["COOL BOSS","HV900", "", "High FIVE"]];
        var request = {spreadsheetId:spreadsheet_id, range:range_name, valueInputOption:value_input_option, values:values};
        // Perform request
        gapi.client.sheets.spreadsheets.values.append(request).execute(function(err,response){
            if(err){
                console.log(err);
                return;
            }
            console.log(response);
        });
    };


}])