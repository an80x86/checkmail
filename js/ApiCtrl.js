app.controller("ApiCtrl", ['$scope', 'xlatService', '$location', '$http',
  function ($scope, xlatService, $location, $http) {

  $scope.apikey = xlatService.xlat('API_K', null);
  $scope.api = xlatService.xlat('API', null);
  $scope.full  = xlatService.xlat('API_F', null);
  $scope.mail = xlatService.xlat('API_M', null);
  $scope.ornek = xlatService.xlat('API_S', null);
  $scope.kalan = xlatService.xlat('API_KA', null);

  $scope.Init = function() {
    $http({
      method : "GET",
      url : "system/"
    }).then(function mySuccess(response) {
      var d = response.data;
      $scope.key = d.key;
      $scope.kontor = d.free;
      $scope.url = "https://checkmail.co/system/check/" + d.key + "/test@test.com";
    }, function myError(response) {
      alert(response.statusText);
    });
  }

  $scope.Init();
  defaultListController($scope, xlatService, $location.path());
}]);
