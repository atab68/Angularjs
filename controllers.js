
//CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
   $scope.city = cityService.city;
  
  //watching
  
  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });
  
  $scope.submit = function() {
    $location.path("/forecast");
  };
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', '$http', 'cityService', function($scope, $resource, $routeParams, $http, cityService) {
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || 2;
  
//  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=32527174625547dfc7695f0f0013a2ac", 
//     {callback: "JSON_CALLBACK"}, {get: { method: "JSONP"}}
//  );
  
  $http.get('http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=32527174625547dfc7695f0f0013a2ac')
  .success(function(result) {
    $scope.weatherResult = result;
    console.log(result);
  })
  .error(function(data, status) {
    console.log(data)
  })
  
//  console.log(weatherAPI);
//  
//  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
//  
  //console.log(weatherResult);
  
  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273)) + 32);
  }
  
  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  }
}]);