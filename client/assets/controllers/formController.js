app.controller('formController', function($location, $scope, $cookies, $location, formFactory, $mdStepper, $mdDialog, userFactory, InspectionService, InspectionsService, LiftService, ClientService, SpreadsheetService){

	var getdate = function(){
		var datenow = new Date();
		var month = (datenow.getMonth() + 1).toString();
		var day = datenow.getDate().toString();
		var year = datenow.getFullYear().toString();
        
		day = day.length == 1 ? "0" + day : day;
		month = month.length == 1 ? "0" + month : month;
		return year + "-" + month + "-" + day
	}

	$scope.formData = {};
	$scope.appendix = {};
	
	$scope.appendix.c = [
                {"key": "c1",
		        "subject": "Record location of generic safety instructions."},  //Select
                {"key": "c2",
                "subject":"Record location of lifting point information. Select"},
                {"key": "c3",
                "subject":"Check accessibility and readability of safety warning labels."},
                {"key": "c4",
                "subject":"Record location of manufacturer instructions or generic instructions. Select"},
                {"key": "c5",
                "subject":"Record the rated load capacity of the lift."},
                {"key": "c6",
                "subject":"Record manufacturer name, model number and serial number(s)."},
                {"key": "c7",
                "subject":"Confirm adequacy of clearances around lift."}
                // {"key": "c8",
                // "subject":"Examine all structural components including welds."},
                // {"key": "c9",
                // "subject":"Examine electrical components and wiring."},
                // {"key": "c10",
                // "subject":"Check the lift controls."},
                // {"key": "c11",
                // "subject":"On lifts using runways, check to ensure proper operation of all features."},
                // {"key": "c12",
                // "subject":"On lifts using swing arms, check telescoping stops."},
                // {"key": "c13",
                // "subject":"On lifts requiring swing arm restraints, check for proper function."},
                // {"key": "c14",
                // "subject":"Check all fastening devices for tightness including floor anchor bolts."},
                // {"key": "c15",
                // "subject":"Check exposed surfaces and edges."},
                // {"key": "c16",
                // "subject":"Operate the lift and check the operation of the positive stop and the lift locks."},
                // {"key": "c17",
                // "subject":"On lifts employing adapters, check condition and proper operation."},
                // {"key": "c18",
                // "subject":"With a representative vehicle on the lift, check the lowering speed."},
                // {"key": "c19",
                // "subject":"Check all points requiring lubrication."},
                // {"key": "c20",
                // "subject":"On lifts equipped with lateral synchronization or equalization systems, check the operation of the synchronization or equalization systems."},
                // {"key": "c21",
                // "subject":"On lifts incorporating working platforms, railings and stairways, check the railings and the walking surfaces."},
                // {"key": "c22",
                // "subject":"On lifts incorporating overhead structures, verify the safety shutoff."},
                // {"key": "c23",
                // "subject":"Inspect all chains and wire ropes."},
                // {"key": "c24",
                // "subject":"Check the tracking and level winding of wire ropes and chains."},
                // {"key": "c25",
                // "subject":"Report unguarded pinch points."},
                // {"key": "c26",
                // "subject":"Confirm single point operation of multiple powered posts."},
                // {"key": "c27",
                // "subject":"Report water in sub-floor pits or enclosures."},
                // {"key": "c28",
                // "subject":"Check all accessories for construction and labeling."}
	];

	$scope.appendix.d = [
		        {"key": "d1",
		        "subject": "Check all accessible piping, tubing, hose, valves and fittings. Review lift oil consumption records."},
                {"key": "d2",
                "subject":"Operate lift through full travel and observe."},
                {"key": "d3",
                "subject":"With lift loaded, stop the load at midpoint of travel and observe.  Pass/Fail"},
                {"key": "d4",
                "subject":"Check with operator to ascertain any unusual operating characteristics."},
                {"key": "d5",
                "subject":"On lifts which incorporate trench covers, verify the proper operation. "},
                {"key": "d6",
                "subject":"On air-oil lifts check for low oil control."},
                {"key": "d7",
                "subject":"Confirm cylinder venting provisions."},
                {"key": "d8",
                "subject":"Confirm rotation prevention device on single post lifts."}
	];

	////////////////////////////////////////
	// Constructors
	////////////////////////////////////////

	$scope.formView = function(){
        $scope.formData = {};
        $scope.formData.inspection_date = getdate();
        // console.log(InspectionService)
        SpreadsheetService.list().then(function(spreadsheet){

            ClientService.list(spreadsheet.id).then(function(result){
                console.log(result.data)
                $scope.clients = result.data;
            });
            LiftService.list(spreadsheet.id).then(function(result){
                console.log(result.data)
                $scope.lifts = result.data;
            })
        })
	}

	// END Constructors
	////////////////////////////////////////


	$scope.testPassColor = function(pass){
		if (pass == 'pass'){
			return 'green'
		} else {
			return 'red'
		}
	}

	$scope.nextPage = function(){
		var steppers = $mdStepper('stepper-demo');
		steppers.next();
	}

	$scope.previousPage = function(){
		var steppers = $mdStepper('stepper-demo');
		steppers.back();
	}


	$scope.submitForm = function(){
		// formFactory.submitForm($scope.formData, function(data){
		// 	if(data.errors){
		// 		console.log("There was an error")
		// 		console.log(data.errors)
		// 	} else {
		// 		console.log("Success!")
		// 		console.log(data)
		// 		$location.url('/dashboard/inspector')
		// 	}
		// })
        InspectionsService.save($scope.formData).then(function(result){
            console.log("Success")
            console.log(result)
            $location.url("/dashboard/inspector")
        }, function(reason){
            console.log("Failure")
            console.log(reason)
        })

	}

    var getLiftOwners = function(){
        formFactory.getLiftOwners(function(data){
            console.log("Got lift owners here they are:")
            console.log(data)
            $scope.lift_owners = data;
        })
    }

    ////////////////////////////////////////
    //  Add a lift
    ////////////////////////////////////////
    $scope.addlift = function(){
        console.log($scope.newLift);
        formFactory.addlift($scope.newLift, function(data){
            $scope.lifts = data
            $location.url('/dashboard/liftowner')
        })
    }


    ////////////////////////////////////////
    // Expand Table Row
    ////////////////////////////////////////
	$scope.toggleExpanded = function(expanded, $event) {
		//Prevent the button click from selecting entire row
  		$event.stopPropagation();
		//Toggle the expanded state 
  		return !expanded;
	}
    // END Expand Table Row
    ////////////////////////////////////////


    ////////////////////////////////////////
    // Owner Drop Down Handler
    ////////////////////////////////////////
    $scope.selectedOwnerChange = function(item) {
        console.log('Item changed to ' + item.Company);
        $scope.formData.lift_owner = item.Company;
        $scope.formData.address = item.Address;
        $scope.formData.city = item.City;
        $scope.formData.state = item.State;
        $scope.formData.zipcode = item.ZipCode;
        $scope.formData.email = item.Email;
        $scope.formData.phone = item.Phone;
        $scope.formData.fax = item.Fax;
        // $scope.lifts = item._lifts
    }

    ////////////////////////////////////////
    // Lift Drop Down Handler
    ////////////////////////////////////////
    $scope.selectedLiftChange = function(item) {
        console.log(item);
        console.log("This is item^^^^");
        $scope.formData.lift_manufacturer = item.manufacturer;
        $scope.formData.lift_model = item.model;
        $scope.formData.mfg_serial = item.mfg_serial;
        console.log($scope.formData.mfg_serial)
        $scope.formData.lift_capacity = item.lift_capacity;
        $scope.formData.lift_type = item.lift_type;
        $scope.formData.lift_design = item.lift_design;


    }

    $scope.chooseFile = function(str) {
        var id = "fileInput-"+str;
        document.getElementById(id).click();
    }

 
    ////////////////////////////////////////
    // Check to see if user is logged in  
    ////////////////////////////////////////
    $scope.checkLogin = function(){
        userFactory.checkLogin(function(data){
            if (!data._id){
                console.log("LOGGED OUT")
                $scope.logout();
            }
        })
    }
    ////////////////////////////////////////
    // If not clear the cookie
    $scope.logout = function(){
        $cookies.remove('name');
        $cookies.remove('id');
        $cookies.remove('type');
        $scope = {}
        $location.url('/'); 
    }



    $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Is this inspection complete?')
          // .textContent('')
          .ariaLabel('Inspection Complete')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');



    $mdDialog.show(confirm).then(function() {
        $scope.formData.completed = true;
        $scope.showPassFail(ev)
    }, function() {
        $scope.formData.completed = false;
    });
    };

    $scope.showPassFail = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var passFail = $mdDialog.confirm()
        .title('Did the lift pass or fail?')
        // .textContent('All of the banks have agreed to forgive you your debts.')
        .ariaLabel('pass fail')
        .targetEvent(ev)
        .ok('Pass')
        .cancel('Fail');


    $mdDialog.show(passFail).then(function(data) {
        console.log("This is data")
        console.log(data)
        console.log("This is data")
        $scope.formData.status = 'pass';
        $scope.submitForm();
    }, function() {
        console.log("denied")
        $scope.formData.status = 'fail';
        $scope.submitForm();
    });

    };



});
