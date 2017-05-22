app.controller('userController', function($location, $scope, $cookies, userFactory, UserService, InspectionService){



	$scope.InspectionService = InspectionService;

	////////////////////////////////////////
	// Constructors
	////////////////////////////////////////
	$scope.adminView = function() {
		$scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		if (!$cookies.get('type')){
			$location.url('/');
		} else if ($cookies.get('type') == 'inspector') {
			$location.url('/dashboard/inspector');
		} else if ($cookies.get('type') == 'lift_owner'){
			$location.url('/dashboard/liftowner');
		} else {
			//The Correct Path
			getAllUsers();			
		}

	}
	$scope.inspectorView = function() {
		// $scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		// if (!$cookies.get('type')){
		// 	$location.url('/');
		// } else if ($cookies.get('type') == 'admin') {
		// 	$location.url('/dashboard/admin');
		// } else if ($cookies.get('type') == 'lift_owner'){
		// 	$location.url('/dashboard/liftowner');
		// } else {
			//The Correct Path

			$scope.getInspections();
			// gapi.auth2.getAuthInstance().isSignedIn	
		// }
	}
	$scope.liftownerView = function(){
		$scope.checkLogin()

		////////////////////////////////////////
		// Handle redirects
		if (!$cookies.get('type')){
			$location.url('/');
		} else if ($cookies.get('type') == 'admin') {
			$location.url('/dashboard/admin');
		} else if ($cookies.get('type') == 'inspector'){
			$location.url('/dashboard/inspector');
		} else {
			//The Correct Path
			$scope.getUserLifts();
		}
	}
	// END Constructors
	////////////////////////////////////////

	var getAllUsers = function() {
		userFactory.getusers(function(data){
			$scope.allUsers = data;
		})
	}

	$scope.adduser = function(){
		userFactory.adduser($scope.newUser, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.regErrors = data.errors;
			} else {
				$location.path('/')
				$scope.newUser = {}
			}
		})
	}

	$scope.login = function(){
		userFactory.loginuser($scope.userData, function(data){

			if(data.hasOwnProperty('errors')){
				$scope.loginErrors = data.errors;
			} else {
				$cookies.put("name", data['name']);
				$cookies.put("id", data['_id']);
				$cookies.put("type", data['type']);

				UserService = data;
				if (data.resetPassword) {
					$location.url('/passwordchange');
				}else if (data.type == 'admin') {
					$location.url('/dashboard/admin');
				}else if (data.type == 'lift_owner'){
					$location.url('/dashboard/liftowner');	
				}else if (data.type == 'inspector'){
					$location.url('/dashboard/inspector');	
				} 
			}
		})
	}

	$scope.forgotPassword = function(){
		userFactory.forgotPassword($scope.userData, function(data){
			if(data.hasOwnProperty('errors')){
				$scope.loginErrors = data.errors;
			} else {
				$location.url('/')
			}
		})
	}

	$scope.changePassword = function(){
		$scope.userData.email = $cookies.get('id');
		userFactory.changePassword($scope.userData, function(data){
			console.log(data);
			if (data.type == 'admin') {
				$location.url('/dashboard/admin');
			}else if (data.type == 'lift_owner'){
				$location.url('/dashboard/liftowner');	
			}else if (data.type == 'inspector'){
				$location.url('/dashboard/inspector');	
			}
		})
	}

	$scope.checkLogin = function(){
		userFactory.checkLogin(function(data){
			if (!data._id){
				console.log("LOGGED OUT")
				$scope.logout();
			}
		})
	}

	$scope.logout = function(){
		$cookies.remove('name');
		$cookies.remove('id');
		$cookies.remove('type');
		$scope = {}
		$location.url('/');	
	}

	$scope.getInspections = function(){
		userFactory.getInspections(function(data){
			if (data.errors) {
				console.log("THERE WERE ERRORS GETTING INSPECTIONS")
				// console.log(data.errors)
			} else {
				$scope.inspections = data;
			}

		})
	}

	$scope.getUserLifts = function(){
		userFactory.getUserLifts(function(data){
			if (data.errors) {
				console.log("THERE WERE ERRORS GETTING LIFTS")
				// console.log(data.errors)
			} else {
				$scope.lifts = data;	
			}

		})
	}

	$scope.editInspection = function(inspection){
		for (key in inspection){
			InspectionService[key] = inspection[key];	
		}
		$location.url("/inspect");
	}


	$scope.createPDF = function(inspection){
		console.log(inspection)

		var formArray = [[{text: 'Item', style: 'header'}, {text: 'Result', style: 'header'}
              ]];
        formArray.push(["Owner Name", inspection.lift_owner]);
        formArray.push(["Address", inspection.address]);
        formArray.push(["City", inspection.city]);
        formArray.push(["State", inspection.state+""]);
        formArray.push(["Zip Code", inspection.zipcode+""]);
        formArray.push(["Phone", inspection.phone+""]);
        formArray.push(["Fax", inspection.fax+""]);
        formArray.push(["Email", inspection.email+""]);
        formArray.push(["Operator ID", inspection.employee_id+""]);
        formArray.push(["Operator Name", inspection.operator+""]);
        formArray.push(["ALI certification #", inspection.ali_certification+""]);
        formArray.push(["Lift Model", inspection.lift_model+""]);
        formArray.push(["Lift Capacity", inspection.lift_capacity+""]);
        formArray.push(["Inspection Date", inspection.created_at+""]);
        formArray.push(["Inspector Name", inspection.inspector_name+""]);
        formArray.push(["Inspector ID", inspection.inspector_id+""]);
        formArray.push(["Inspection Name", inspection.inspector_name+""]);
        formArray.push(["Manufacturer Serial No.", inspection.mfg_serial+""]);
        formArray.push(["Appendix C",""]);

        console.log(formArray)
        for(var i = 0; i < $scope.appendix.c.length; i++){
			formArray.push([$scope.appendix.c[i].subject , inspection[$scope.appendix.c[i].key].pass])
		}
        formArray.push(["Appendix D",""])

        for(var i = 0; i < $scope.appendix.d.length; i++){
			formArray.push([$scope.appendix.d[i].subject , inspection[$scope.appendix.d[i].key].pass])
		}
		        
          //                   <tr>
          //                       <td>Inspector ID</td>
          //                       <td>{{formData.inspector_id}}</td>
          //                   </tr>



		var docDefinition = {
      content: [
        {
          text: 'Inspection Certificate & Checklist'
        },
        {
          style: 'demoTable',
          table: {
            widths: ['*', '*'],
            body: formArray
          }
        }
      ],
      styles: {
        header: {
          bold: true,
          color: '#000',
          fontSize: 11
        },
        demoTable: {
          color: '#666',
          fontSize: 10
        }
      }
    };

    
  	pdfMake.createPdf(docDefinition).open();
	}



	// var getdate = function(){
	// 	var datenow = new Date();
	// 	var month = (datenow.getMonth() + 1).toString();
	// 	var day = datenow.getDate().toString();
	// 	var year = datenow.getFullYear().toString();

	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return year + "-" + month + "-" + day
	// }


	// $scope.setDate= function(date){
	// 	console.log("In set Date with this data")
	// 	console.log(date)
	// 	var month = (date.getMonth() + 1).toString();
	// 	var day = date.getDate().toString();
	// 	var year = date.getFullYear().toString();
	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return month + "/" + day + "/" + year
	// }

	// $scope.setExpiration = function(date){
	// 	console.log("In set expiration with this data")
	// 	console.log(date)
	// 	var month = (date.getMonth() + 1).toString();
	// 	var day = date.getDate().toString();
	// 	var year = (date.getFullYear()+1).toString();
	// 	day = day.length == 1 ? "0" + day : day;
	// 	month = month.length == 1 ? "0" + month : month;
	// 	return month + "/" + day + "/" + year
	// }



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


});