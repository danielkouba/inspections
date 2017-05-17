app.controller('googleAPIController', function ($scope, $location, userFactory) {

      // Client ID and API key from the Developer Console
      var CLIENT_ID =  '137889948897-g2tu5039lemhpri66imaqbhj5892si5s.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file";

      // These are the two control buttons, default display none
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      $scope.handleClientLoad = function() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).then(function(){
          $location.url('/dashboard/inspector')
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listClients();
          console.log("LOGGED IN GRINCH")
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
    }

      /**
       *  Sign in the user upon button click.
       */
    $scope.handleAuthClick = function(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

      /**
       *  Sign out the user upon button click.
       */
    $scope.handleSignoutClick = function(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
    function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    function appendSheet(message) {
        var pre = document.getElementById('sheets');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
    function listClients() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1MjpNcizLsCFYBKU2ZI1ChF56ikUUIBkzlnJEX7dD1tQ',
          range: 'Clients!A2:B',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            appendPre('Client, Lift');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              appendPre(row[0] + ', ' + row[1]);
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
        // console.log("This is that  one spreadsheet")
        // console.log(gapi.client.sheets.spreadsheets.get({spreadsheetId:'1xtHRRYTc2IwzLwbgFzBLq_J_v4PgcUHTIAogfkA5Z2k'}))
      }

    // Get all Spreadsheets
    $scope.getSheets = function(){
        gapi.client.request({
            'path':  'https://www.googleapis.com/drive/v2/files'
         }).then(function(response) {
            console.log(response.result);
            var range = response.result.items;
            for(var i = 0; i < range.length; i++){
                var sheet = range[i];
                appendSheet(sheet.title + " " + sheet.createdDate)
            }
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    // Create a new Spread Sheet
    $scope.createSheet = function(){
        if(!$scope.sheetTitle){
            $scope.sheetTitle = "Inspectorsheet";
        }
        data = {'properties': {'title': $scope.sheetTitle}};
        sheet = gapi.client.sheets.spreadsheets.create(body=data).execute(function(err, response){
                if (err) {console.log(err)};
                var response = JSON.parse(response);
                duplicateSheet(response[0].result.spreadsheetId);        
            })

    }


    // This duplicates the Inspector sheet
    var duplicateSheet= function(copyToID) {
        var request = {
                    spreadsheetId: '1xtHRRYTc2IwzLwbgFzBLq_J_v4PgcUHTIAogfkA5Z2k',
                    sheetId: 1969539565,
                    resource: {
                        title: "Inspector Sheet",
                        destinationSpreadsheetId: copyToID
                    }
                }
                gapi.client.sheets.spreadsheets.sheets.copyTo(body = request).execute( function(err, resp){
                    if (err){
                        console.log("There was an error:");
                        console.log(err);
                        return;
                    }

                    console.log('Success');
                })
    }


});	
