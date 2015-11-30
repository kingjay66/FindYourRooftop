angular.module('WGLR', ['ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps', 'ui.router', 'register'])
.config(function(uiGmapGoogleMapApiProvider , $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'appController',
      templateUrl: 'index.html'
      // controller: 'formController',
      // templateUrl: './client/register/register.html'
      // resolve: { authenticate: authenticate }
    })
    .state('adminLogIn', {
      url: '/adminLogIn',
      controller: 'formController',
      templateUrl: './views/adminLogIn.html'
    })
    .state('suggestions', {
      url: '/suggestions',
      controller: 'suggestionController',
      templateUrl: './views/suggestions.html'
    })
    .state('main', {
      url: '/main',
      controller: 'appController',
      templateUrl: 'index2.html'
    })
    .state('admin', {
      url: '/admin',
      controller: 'appController',
      templateUrl: 'admin.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'formController',
      // templateUrl: './views/signup.html'
      templateUrl: './client/register/register.html'
    })
    .state('login', {
      url: '/login',
      controller: 'formController',
      templateUrl: './views/login.html'
    })
    .state('approve', {
      url: '/approve',
      controller: 'approvalController',
      templateUrl: './views/adminView.html'
    })


    // function authenticate($q, user, $state, $timeout) {
    //   if (user.isAuthenticated()) {
    //     // Resolve the promise successfully
    //     return $q.when()
    //   } else {
    //     // The next bit of code is asynchronously tricky.

    //     $timeout(function() {
    //       // This code runs after the authentication promise has been rejected.
    //       // Go to the log-in page
    //       $state.go('signup')
    //     })

    //     // Reject the authentication promise to prevent the state from loading
    //     return $q.reject()
    //   }
    // }

    //NEED TO INSERT GOOGLE MAPS API
  uiGmapGoogleMapApiProvider.configure({
    key: '',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})

// .controller('menuController', function($scope, $http) {

//   // $scope.findMenu();
// })
// app.run(function ($rootScope, $location, session, $timeout) {
//   $rootScope.$on("$routeChangeStart", function (event, next, current) {
//     if (!Session.isUserLoggedIn()) {
//           $location.path('/signup');
//       }
//     })
//   }
// .controller('menuController', function($scope, $http) {

//   // $scope.findMenu();
// })

.controller('appController', function($scope, $http, $location, uiGmapGoogleMapApi) {

  $scope.list = [];
  $scope.menu = [];
  //how/where to change isLoggedIn elsewhere? also, use the isLoggedIn helper function?
  $scope.isLoggedIn = true;

  $scope.findMenu = function(name, postal) {
    console.log(name, postal)
    return $http({
      method: 'POST',
      url: '/menu',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: {name: name, postal_code: postal}
    }).then(function(res) {
      console.log('inside app.js $scope.findMenu');
      console.log(res.data);
      $scope.menu = res.data;
    })
  }
 

  $scope.sendZipCode  = function(searchParam) {
    // var params = '{enter query}';
    var integers = ['0','1','2','3','4','5','6','7','8','9']
    var data;
    if(integers.indexOf(searchParam[0]) >= 0) {
      data = {zipCode: searchParam};
    } else {
      data = {city: searchParam};
    }
    console.log('inside app.js $scope.sendZipCode');
    console.log(data);
    return $http({
      method: 'POST',
      url: '/home',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: data
    }).then(function(res) {
      console.log('inside app.js $scope.sendZipCode .then');
      console.log(res.data);
      $scope.list = res.data;
      console.log('scope list is : ' + $scope.list[key])
      //---Google Maps start---
      $scope.markerList = [];
      var markers = [];
      var sumLat = 0;
      var sumLong = 0;
      var count = 0;

      for (var key in $scope.list) {

        console.log($scope.list[key])
        var latitude = $scope.list[key].location.coordinate.latitude;
        var longitude = $scope.list[key].location.coordinate.longitude;
        var name = $scope.list[key].name;
        var ratings = $scope.list[key].rating_img_url_small;
        var reviewCount = $scope.list[key].review_count;
        var url = $scope.list[key].url;

        //markers.push({id: key, latitude: latitude, longitude: longitude, name: name, url: url, ratings: ratings, show: false });


        markers.push({id: key, latitude: latitude, longitude: longitude, name: name, url: url, ratings: ratings, reviewCount: reviewCount, show: false });


        sumLat += latitude;
        sumLong += longitude;
        ++count;
      }

      var avgLat = sumLat / count;
      var avgLong = sumLong / count;

      $scope.map = {center: { latitude: avgLat, longitude: avgLong }, zoom: 10 };
      $scope.markerList = markers;

      // $scope.onClick = function(marker, eventName, model) {
      //   console.log("Clicked!");
      //   model.show = !model.show;
      // };

      // uiGmapGoogleMapApi.then(function(maps) {
      //   console.log("Working");
      // });
      //---Google Maps End---

    });
  };

  /* $scope.test function() {

  }

  $scope.logout = function() {
      $location.path('/signup');
  }*/


  $scope.mapZoom = function(index) {
    $scope.map = {center: { latitude: $scope.list[index].location.coordinate.latitude, longitude: $scope.list[index].location.coordinate.longitude }, zoom: 17 };
  }
})


.controller('approvalController', function($scope, $http) {
  $scope.suggestions;
  $scope.id;
  $scope.showSuggestions = function() {
  return $http({
    method: 'POST',
    url: '/approve'
  }).then(function(res) {
    console.log('res.data stringified: ' + JSON.stringify(res.data))
    $scope.suggestions = res.data
  })
  }

  $scope.changeColor = function(context, id, data) {
    if(data.clicked) {
      data.clicked = false;
    } else {
    data.clicked = true;
    }
  }

  $scope.filterTrue = function () {
    var newArray = []
    for(var i = 0; i < $scope.suggestions.length; i++) {
      if($scope.suggestions[i].clicked) {
        newArray.push($scope.suggestions[i].name);
      }
    }
    return newArray;
  }

  $scope.rejectSubmission = function () {
    var restaurantsTrue = $scope.filterTrue()
    console.log('restaurantsTrue is: ' + restaurantsTrue);
    return $http({
      method: 'POST',
      url: '/reject',
      data: restaurantsTrue
    })
  }

  $scope.acceptSubmission = function () {
    var restaurantsTrue = $scope.filterTrue();
    console.log('restaurantsTrue is: ' + restaurantsTrue);
    return $http({
      method: 'POST',
      url:'/accept',
      data: restaurantsTrue
    })
  }

})

.controller('suggestionController', function($scope, $http) {
    $scope.barData;
    $scope.sendSuggestion = function(data) {
    console.log('hELLO????!?!?!')
    return $http({
      method: 'POST',
      url: '/admin',
      data: data
    })
    };

    $scope.findYelpBar = function(name, city) {
    return $http({
      method: 'POST',
      url: '/submission',
      data: {term: name, limit: 3, location: city}
    }).then(function(res) {
      $scope.barData = res.data
    })
  }
})
