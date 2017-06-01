app.controller('navController', function($rootScope, $scope, $q, $location,ClientService, UserService, LiftService, InspectionsService, userFactory, cmAuthService, cmApiService, googleClient){
	
    $scope.isSignedIn = false;
    $scope.user = "";
    $scope.viewedFile = [];
    $scope.modifiedFile = [];
    $scope.pickedFile = {};
    $scope.filePicked = false;
  	
    // Log out the user without revoking all of the scopes that the user granted.
    $scope.logout = function(){
        cmAuthService.getAuthInstance().then(function (auth2) {
            auth2.signOut();
        });
    };

    // Listen for sign-in state changes. See https://developers.google.com/identity/sign-in/web/listeners
    $scope.signInListener = function(val){
    	// console.log("signin changed")
    	// console.log(val)
        $scope.isSignedIn = val;
        if (val){
	        $location.url('/dashboard/inspector')
        } else {
        	$location.url('/')
        }
    };
	
	// Listen for changes to current user. See https://developers.google.com/identity/sign-in/web/listeners
    $scope.userListener = function(user){
        $scope.user = user.getBasicProfile().getName();
        $scope.getInspectionFile()
    };
  
	$scope.getInspectionFile = function(){
	    var driveOptions = {
	      'maxResults': 10,
	      'orderBy': 'modifiedByMeDate desc',
	      'q': 'title = "ALI - Lift Inspection"'
	    };
	    googleClient.afterApiLoaded().then(function(){
	      // when the above promise is resolved, I'm sure that GAPI il correctly loaded
	      // so here I can use GAPI (essentially is what cmApiService does)
	      gapi.client.drive.files.list(driveOptions).execute(function(resp){
	        $scope.foundSpreadsheet = resp.items[0];

	        // $scope.checkSheets($scope.foundSpreadsheet.id).then(
	        // 	function(data){
	        // 		for(var i = 0; i <data.length; i += 1){
         //                $scope.getSheetData($scope.foundSpreadsheet.id, data[i].properties.title).then(function(sheetData){
         //                    // If getting data is successful then save it to the session
         //                    console.log("This is how we get our sheet data")
         //                    console.log(sheetData)
         //                    // $scope.saveSession(sheetData)
         //                }, function(error){
         //                    console.log("ERROR " + error)
         //                    // return error
         //                })
	        // 		}
	        // 	}, function(error) {
         //            console.log("ERROR " + error)
	        // 		// return error
	        // 	} 
	        // )

	        $scope.$apply();
	      });
	    });
	};	

    // $scope.checkSheets = function(id){
    //     return $q( function(resolve, reject){
    //         setTimeout(function(){
    //             gapi.client.sheets.spreadsheets.get({spreadsheetId: id}).execute(function(response){
    //                 if("error" in response){
    //                     reject(response)
    //                 } else {
    //                     // console.log("Successfully ran get on spreadsheets")
    //                     resolve(response.sheets)
    //                 }
    //             })
    //         })
    //     })
    // }

    // $scope.getSheetData =function(spreadsheetID, sheetTitle){
    //     return $q(function(resolve,reject){
    //         setTimeout(function(){
    //             // console.log(spreadsheetID)
    //             // console.log(sheetTitle)
    //             var spreadsheet_id = spreadsheetID;
    //             var range_name = sheetTitle + '!A1:E';
    //             var value_render_option = 'FORMATTED_VALUE';
    //             var dimension = 'ROWS';
    //             // var value_input_option =  'USER_ENTERED';
    //             // var values = [["COOL BOSS","HV900", , "High FIVE"]];
    //             var params = {spreadsheetId:spreadsheet_id, range:range_name, valueRenderOption: value_render_option}
    //             gapi.client.sheets.spreadsheets.values.get(params).execute(function(response){
    //                 if(!response){
    //                     console.log("error");
    //                     return reject("error");
    //                 }
    //                 console.log("This is the response")
    //                 console.log(response);
    //                 // Extract title from request
    //                 var title = response.range.split("!")[0]
    //                 var finalData = {};
    //                 finalData.title = title; 
    //                 finalData.data = formatData(response.values);
    //                 return resolve(finalData)
    //             });
    //         })
    //     })
    // }

    // var formatData = function(arr){
    //     keys = arr[0];
    //     var returnArray = [];
    //     var formattedData = {};
    //     for(var i = 1; i < arr.length; i++){
    //         formattedData = {};
    //         for(var n = 0; n < keys.length; n++){
    //             formattedData[keys[n]] = arr[i][n];
    //         }
    //         returnArray.push(formattedData);
    //     }
    //     return returnArray
    // }


    // $scope.saveSession = function(saveData){
    //     console.log("We are in the Save Session function")
    //     userFactory.saveData(saveData, function(returned_data){
    //         // ClientService = {
    //         //     Company: returned_data.Clients.Company,
    //         //     Owner: returned_data.Clients.Owner,
    //         //     Address: returned_data.Clients.Address,
    //         //     City: returned_data.Clients.City,
    //         //     State: returned_data.Clients.State

    //         // };
    //         // 
    //         // InspectionService = returned_data.Inspections;
    //         // LiftService = returned_data.Lifts;
    //         console.log(ClientService)
    //         console.log(returned_data)
    //     })
    // }
    $scope.getSession = function(){
        // userFactory.getData(function(data){
        //     console.log(data)
        // })
        ClientService.list($scope.foundSpreadsheet.id).then(function(result){
            console.log(result)
            $scope.clients = result.data
        })

        LiftService.list($scope.foundSpreadsheet.id).then(function(result){
            console.log(result)
            $scope.lifts = result.data
        })
        
        InspectionsService.list($scope.foundSpreadsheet.id).then(function(result){
            console.log(result)
            $scope.inspections = result.data
        })

    }

})