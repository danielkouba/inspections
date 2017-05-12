myApp.controller('formController', function($location, $scope, $cookies, formFactory, $mdStepper, userFactory, InspectionService){

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
        $scope.checkLogin()
        // Load clients
        if($cookies.get('id')){
            console.log(InspectionService)
            if (InspectionService._id){
                console.log("EDITING")
                $scope.formData = InspectionService;
            }
            getLiftOwners();
        } else {
            $location.url("/");
        }

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
		formFactory.submitForm($scope.formData, function(data){
			if(data.errors){
				console.log("There was an error")
				console.log(data.errors)
			} else {
				console.log("Success!")
				console.log(data)
				$location.url('/dashboard/inspector')
			}
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
        console.log('Item changed to ' + item);
        $scope.formData.lift_owner = item.company;
        $scope.formData.address = item.address;
        $scope.formData.city = item.city;
        $scope.formData.state = item.state;
        $scope.formData.zipcode = item.zip_code;
        $scope.formData.email = item.email;
        $scope.lifts = item._lifts
    }

    ////////////////////////////////////////
    // Lift Drop Down Handler
    ////////////////////////////////////////
    $scope.selectedLiftChange = function(item) {
        console.log('Item changed to ' + item);
        $scope.formData.lift_manufacturer = item.manufacturer;
        $scope.formData.lift_model = item.model;
        $scope.formData.mfg_serial = item.serial;
        $scope.formData.lift_capacity = item.capacity;
        $scope.formData.lift_type = item.type;
        $scope.formData.lift_id = item._id;

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

});
