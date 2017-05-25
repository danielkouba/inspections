app.service('googleService', ['$http', '$rootScope', '$q', 'UserService', function ($http, $rootScope, $q, UserService) {
    // var clientId = '137889948897-g2tu5039lemhpri66imaqbhj5892si5s.apps.googleusercontent.com',
    //     // apiKey = '{API_KEY}',
    //     scopes = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file",
    //     deferred = $q.defer();
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
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
    this.initClient = function () {
        console.log("initClient")
        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
        });
    }


    this.login = function () {
        console.log("DONT DELETE ME")
        gapi.auth.authorize({ 
            client_id: clientId, 
            scope: scopes, 
            immediate: false, 
        }, this.handleAuthResult);

        return deferred.promise;
    };

    /**
    *  On load, called to load the auth2 library and API client library.
    */
    this.handleClientLoad = function() {
        console.log("handleClientLoad")
        gapi.load('client:auth2', initClient);
    };

    /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
    function updateSigninStatus(isSignedIn) {
        console.log("updateSigninStatus")
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          // listClients();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
    }

      /**
       *  Sign in the user upon button click.
       */
    this.handleAuthClick = function(event) {
        console.log("handleAuthClick")
        gapi.auth2.getAuthInstance().signIn();
    }

      /**
       *  Sign out the user upon button click.
       */
    this.handleSignoutClick = function(event) {
        console.log("handleSignoutClick")
        gapi.auth2.getAuthInstance().signOut();
    }

    this.checkAuth = function() {
        console.log("checkAuth")
        gapi.auth.authorize({ 
            client_id: clientId, 
            scope: scopes, 
            immediate: true, 
            hd: domain 
        }, this.handleAuthResult);
    };


    ////////////////////////////////////////
    // Are we logged in?
    ////////////////////////////////////////
    this.loggedIn = function(){
         // GoogleAuth.isSignedIn.get()
        // return this.initClient()
    }

    this.handleAuthResult = function(authResult) {
        console.log("handleAuthResult")
        if (authResult && !authResult.error) {
            var data = {};
            gapi.client.load('oauth2', 'v2', function () {
                var request = gapi.client.oauth2.userinfo.get();
                request.execute(function (resp) {
                    data.email = resp.email;
                });
            });
            deferred.resolve(data);
        } else {
            deferred.reject('error');
        }
    };

    ////////////////////////////////////////
    // List all clients
    ////////////////////////////////////////
    function listClients() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1MjpNcizLsCFYBKU2ZI1ChF56ikUUIBkzlnJEX7dD1tQ',
          range: 'Clients!A2:B',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            // appendPre('Client, Lift');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and B, which correspond to indices 0 and 1.
              // appendPre(row[0] + ', ' + row[1]);
            }
          } else {
            // appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
        // console.log("This is that  one spreadsheet")
        // console.log(gapi.client.sheets.spreadsheets.get({spreadsheetId:'1xtHRRYTc2IwzLwbgFzBLq_J_v4PgcUHTIAogfkA5Z2k'}))
    }

    ////////////////////////////////////////
    // Get all sheets
    ////////////////////////////////////////
    this.getSpreadsheets = function(callback){
        gapi.client.request({
            'path':  'https://www.googleapis.com/drive/v2/files'
         }).then(function(response) {
            range = response.result.items;
            if (typeof callback == 'function'){
                callback(range)
            }           
       }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

    ////////////////////////////////////////
    // Create a Sheet
    ////////////////////////////////////////
    this.createSpreadsheet = function(str){
        return $q( function(resolve, reject){
            setTimeout(function(){
                // data = {'properties': {'title': str}};
                var data = {
                    "properties": {
                        "title": "ALI - Lift Inspection"
                    },
                    "sheets": [
                        {"properties": {
                            "title": "Clients",
                            "gridProperties": {
                                "rowCount": 20,
                                "columnCount": 12
                            },
                            "tabColor": {
                                "red": 0.0,
                                "green": 0.0,
                                "blue": 1.0
                            }
                        }},
                        {"properties": {
                            "title": "Inspections",
                            "gridProperties": {
                                "rowCount": 20,
                                "columnCount": 12
                            },
                            "tabColor": {
                                "red": 0.0,
                                "green": 1.0,
                                "blue": 0.4
                            }
                        }},
                        {"properties": {
                            "title": "Lifts",
                            "gridProperties": {
                                "rowCount": 20,
                                "columnCount": 12
                            },
                            "tabColor": {
                                "red": 1.0,
                                "green": 0.0,
                                "blue": 1.0
                            }
                        }}
                    ]    
                }        
                sheet = gapi.client.sheets.spreadsheets.create(body=data).execute(function(err, response){
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {        
                        resolve(JSON.parse(response))
                    }        
                })
            })
        })
    }

    this.checkSheets = function(){
        return $q( function(resolve, reject){
            setTimeout(function(){
                gapi.client.sheets.spreadsheets.get({spreadsheetId: UserService.getData().id}).execute(function(response){
                    if("error" in response){
                        reject(response)
                    } else {
                        console.log("Successfully ran get on spreadsheets")
                        resolve(response.sheets)
                    }
                })
            })
        })
    }

    ////////////////////////////////////////
    // Get Single Sheet
    ////////////////////////////////////////
    // this.getSingleSheet = function(str, callback){
    //     this.getSheets(function(sheets){
    //         for(var i = 0; i < sheets.length; i++){
    //             if (sheets[i].title == str){
    //                 callback(sheets[i]);
    //                 userService.setData(sheets[i].id, sheets[i].title)
    //             }
    //         }
    //     })
    // }

    this.getSingleSheet = function(str){
        console.log("winner")
        return $q( function(resolve, reject) {
            setTimeout(function(){
                gapi.client.request({
                    'path': 'https://www.googleapis.com/drive/v2/files'
                }).then(function(response){
                    // Store all of the returned documents
                    var range = response.result.items;
                    // This will store the filtered result
                    var mySheet;
                    for(var i = 0; i < range.length; i++){
                        // If the title matches the document title
                        if (range[i].title == str){
                            mySheet = range[i];
                        }
                    }
                    // If we found results
                    if(mySheet){
                        // Set the info to the user info service
                        UserService.setData(mySheet.id, mySheet.title)
                        // Send back successful data
                        resolve(mySheet)
                    } else {
                        // Send back that we didnt find anything
                        // Maybe create the file here

                        reject("No sheet found")
                    }
                }, function(reason){
                    // Something went wrong with the authorization
                    reject(reason)
                })
                
            })
        })
    }

    ////////////////////////////////////////
    // Duplicate Sheet
    // This is not implemented yet
    ////////////////////////////////////////
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
            console.log('Success')
        })
    }


    }
]);