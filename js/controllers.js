angular.module('starter.controllers', [])

// A simple controller that shows a tapped item's data
.controller('DashboardCtrl', function($scope, $stateParams, $http, $window, BucketService) {
  

  $scope.total_saved = '123.45';

  //$scope.response = {"user":[{"id":114,"target":"750.0","total":"-599.92","name":"CEating Out","is_target_reached":false,"has_target":false,"target_percentage_achieved":-80,"friendly_name_key":"eating_out"},{"id":34,"target":"1079.0","total":"0.0","name":"Money","is_target_reached":false,"has_target":false,"target_percentage_achieved":0,"friendly_name_key":"money"},{"id":69,"target":"1000.0","total":"700.0","name":"Clothes Budget","is_target_reached":false,"has_target":false,"target_percentage_achieved":70,"friendly_name_key":"clothes_budget"},{"id":36,"target":"2220.0","total":"1800.0","name":"Holiday","is_target_reached":false,"has_target":true,"target_percentage_achieved":81,"friendly_name_key":"holiday"},{"id":32,"target":"1230.0","total":"500.0","name":"Rainy day","is_target_reached":false,"has_target":false,"target_percentage_achieved":41,"friendly_name_key":"rainy_day"},{"id":35,"target":"1200.0","total":"0.0","name":"Music","is_target_reached":false,"has_target":true,"target_percentage_achieved":0,"friendly_name_key":"music"}],"trans":[{"amount":"0.08","bucket_id":114,"created_at":"2013-12-27T11:59:26Z","fit_key":"NET_INTEREST tot-2183.27 date 2013-08-16 0.08","id":1331,"is_split":false,"name":"NET INTEREST TO 15AUG2013","parent_id":null,"recurring_transaction_id":null,"statement_date":"2013-08-16","statement_id":214,"total":"2183.27","transaction_meta_id":143,"updated_at":"2014-01-15T13:42:00Z","user_id":1},{"amount":"-600.0","bucket_id":114,"created_at":"2013-12-27T11:59:26Z","fit_key":"401414_41275496 tot-2183.19 date 2013-08-01 -600.0","id":1332,"is_split":false,"name":"401414 41275496 INTERNET TRANSFER","parent_id":null,"recurring_transaction_id":null,"statement_date":"2013-08-01","statement_id":214,"total":"2183.19","transaction_meta_id":144,"updated_at":"2014-01-15T13:42:00Z","user_id":1}]};
  $scope.buckets = [];//$scope.response.user; //[{"bucket_image_id":26,"created_at":"2013-11-29T08:30:02Z","id":114,"name":"Eating Out","name_key":"1_eating_out","notes":"Trek FX 7.5 \u00a3750<br/>\nSpecialized Sirrus Elite Disc \u00a3800<br/>\n<a href=\"http://www.mud-dock.co.uk\">www.mud-dock.co.uk</a>","status_key":0,"target":"750.0","target_date":"2013-12-25","total":"-599.92","transactions_count":null,"updated_at":"2014-03-09T00:12:30Z","user_id":1,"weight":0},{"bucket_image_id":29,"created_at":"2013-01-26T17:34:02Z","id":34,"name":"Money","name_key":"1_money","notes":null,"status_key":0,"target":"1079.0","target_date":"2014-01-01","total":"0.0","transactions_count":14,"updated_at":"2014-03-09T00:12:39Z","user_id":1,"weight":3},{"bucket_image_id":28,"created_at":"2013-08-25T13:27:31Z","id":69,"name":"Clothes Budget","name_key":"1_clothes_budget","notes":null,"status_key":0,"target":"1000.0","target_date":null,"total":"700.0","transactions_count":12,"updated_at":"2014-03-08T21:08:33Z","user_id":1,"weight":5},{"bucket_image_id":27,"created_at":"2013-01-26T17:34:02Z","id":36,"name":"Holiday","name_key":"1_holiday","notes":null,"status_key":0,"target":"2220.0","target_date":"2015-07-31","total":"1800.0","transactions_count":9,"updated_at":"2014-03-08T23:59:55Z","user_id":1,"weight":6},{"bucket_image_id":25,"created_at":"2013-01-26T17:34:02Z","id":32,"name":"Rainy day","name_key":"1_rainy_day","notes":null,"status_key":0,"target":"1230.0","target_date":null,"total":"500.0","transactions_count":-11,"updated_at":"2014-03-08T20:41:13Z","user_id":1,"weight":7},{"bucket_image_id":30,"created_at":"2013-01-26T17:34:02Z","id":35,"name":"Music","name_key":"1_music","notes":null,"status_key":0,"target":"1200.0","target_date":"2014-05-30","total":"0.0","transactions_count":3,"updated_at":"2014-03-09T00:12:18Z","user_id":1,"weight":8}];

  console.log("ONLINE: ",$window.navigator.onLine);

  if ($window.navigator.onLine) {
		$http({
	      method: 'GET',
	      type: 'jsonp',
	      url: 'http://dev.liza.mn/mobile/dashboard',
	      
	  })
	  .success(function (data, status, headers, config) {
	    console.log("SUCCESS")
	    $scope.buckets = data.user;
	    //store
	    window.localStorage.setItem('buckets', JSON.stringify(data.user));
	    BucketService.SetBuckets(data.user);
	    console.log("Storing", data.user)

	  })
	  .error(function (data, status, headers, config) {
	    console.log("ERROR data: ", data.error)
	    // Handle login errors here
	    $scope.message = 'Error: Invalid user or password';
	  });
	} else {
		//Not online, try and get cached
		console.log("HERE", window.localStorage.getItem('buckets'))
		$scope.buckets = JSON.parse(window.localStorage.getItem('buckets'));
	}

  
})

// A simple controller that shows a tapped item's data
.controller('BucketCtrl', function($scope, $stateParams, BucketService) {
  
  $scope.bucket  = BucketService.GetBucketById($stateParams.bucket);
 // 	$scope.buckets = JSON.parse(window.localStorage.getItem('buckets'));
  console.log($stateParams, $scope.bucket);

  // $scope.total_saved = '123.45';

  // $scope.response = {"user":[{"id":114,"target":"750.0","total":"-599.92","name":"CEating Out","is_target_reached":false,"has_target":false,"target_percentage_achieved":-80,"friendly_name_key":"eating_out"},{"id":34,"target":"1079.0","total":"0.0","name":"Money","is_target_reached":false,"has_target":false,"target_percentage_achieved":0,"friendly_name_key":"money"},{"id":69,"target":"1000.0","total":"700.0","name":"Clothes Budget","is_target_reached":false,"has_target":false,"target_percentage_achieved":70,"friendly_name_key":"clothes_budget"},{"id":36,"target":"2220.0","total":"1800.0","name":"Holiday","is_target_reached":false,"has_target":true,"target_percentage_achieved":81,"friendly_name_key":"holiday"},{"id":32,"target":"1230.0","total":"500.0","name":"Rainy day","is_target_reached":false,"has_target":false,"target_percentage_achieved":41,"friendly_name_key":"rainy_day"},{"id":35,"target":"1200.0","total":"0.0","name":"Music","is_target_reached":false,"has_target":true,"target_percentage_achieved":0,"friendly_name_key":"music"}],"trans":[{"amount":"0.08","bucket_id":114,"created_at":"2013-12-27T11:59:26Z","fit_key":"NET_INTEREST tot-2183.27 date 2013-08-16 0.08","id":1331,"is_split":false,"name":"NET INTEREST TO 15AUG2013","parent_id":null,"recurring_transaction_id":null,"statement_date":"2013-08-16","statement_id":214,"total":"2183.27","transaction_meta_id":143,"updated_at":"2014-01-15T13:42:00Z","user_id":1},{"amount":"-600.0","bucket_id":114,"created_at":"2013-12-27T11:59:26Z","fit_key":"401414_41275496 tot-2183.19 date 2013-08-01 -600.0","id":1332,"is_split":false,"name":"401414 41275496 INTERNET TRANSFER","parent_id":null,"recurring_transaction_id":null,"statement_date":"2013-08-01","statement_id":214,"total":"2183.19","transaction_meta_id":144,"updated_at":"2014-01-15T13:42:00Z","user_id":1}]};
  // $scope.bucket = $scope.response.user[0]; //[{"bucket_image_id":26,"created_at":"2013-11-29T08:30:02Z","id":114,"name":"Eating Out","name_key":"1_eating_out","notes":"Trek FX 7.5 \u00a3750<br/>\nSpecialized Sirrus Elite Disc \u00a3800<br/>\n<a href=\"http://www.mud-dock.co.uk\">www.mud-dock.co.uk</a>","status_key":0,"target":"750.0","target_date":"2013-12-25","total":"-599.92","transactions_count":null,"updated_at":"2014-03-09T00:12:30Z","user_id":1,"weight":0},{"bucket_image_id":29,"created_at":"2013-01-26T17:34:02Z","id":34,"name":"Money","name_key":"1_money","notes":null,"status_key":0,"target":"1079.0","target_date":"2014-01-01","total":"0.0","transactions_count":14,"updated_at":"2014-03-09T00:12:39Z","user_id":1,"weight":3},{"bucket_image_id":28,"created_at":"2013-08-25T13:27:31Z","id":69,"name":"Clothes Budget","name_key":"1_clothes_budget","notes":null,"status_key":0,"target":"1000.0","target_date":null,"total":"700.0","transactions_count":12,"updated_at":"2014-03-08T21:08:33Z","user_id":1,"weight":5},{"bucket_image_id":27,"created_at":"2013-01-26T17:34:02Z","id":36,"name":"Holiday","name_key":"1_holiday","notes":null,"status_key":0,"target":"2220.0","target_date":"2015-07-31","total":"1800.0","transactions_count":9,"updated_at":"2014-03-08T23:59:55Z","user_id":1,"weight":6},{"bucket_image_id":25,"created_at":"2013-01-26T17:34:02Z","id":32,"name":"Rainy day","name_key":"1_rainy_day","notes":null,"status_key":0,"target":"1230.0","target_date":null,"total":"500.0","transactions_count":-11,"updated_at":"2014-03-08T20:41:13Z","user_id":1,"weight":7},{"bucket_image_id":30,"created_at":"2013-01-26T17:34:02Z","id":35,"name":"Music","name_key":"1_music","notes":null,"status_key":0,"target":"1200.0","target_date":"2014-05-30","total":"0.0","transactions_count":3,"updated_at":"2014-03-09T00:12:18Z","user_id":1,"weight":8}];


})


.controller('SignInCtrl', function($scope, $state, $http, $window) {
  
  console.log("Startup: ", window.localStorage.getItem('token'))

  if (window.localStorage.getItem('token') != null) {
  	$state.go('tabs.dashboard');
  }

  $scope.signIn = function (user) {

  	var post = "email="+user.email+"&password="+user.password;

  	$http({
          method: 'POST',
          url: 'http://dev.liza.mn/mobile/login',
          data: post,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .success(function (data, status, headers, config) {
      	
        window.localStorage.setItem('token', data.token);
        console.log("Token response", data.token)
        $state.go('tabs.dashboard');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        window.localStorage.removeItem('token');
        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
  };
  
})

;
