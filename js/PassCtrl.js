app.controller("PassCtrl", ['$scope', 'xlatService','$http', '$location',
  function ($scope, xlatService, $http, $location) {

  $scope.Change = function() {
    if ($scope.pass==='') return;
    $scope.wait = !false;

    $http({
      method : "GET",
      url : "system/change/"+$scope.pass
    }).then(function mySuccess(response) {
      var d = response.data;
      $scope.wait = false;
      if (d.rowcnt === 1) {
          alert(xlatService.xlat('PASS_CH', null));
      }
    }, function myError(response) {
      $scope.wait = false;
      alert(response.statusText);
    });
  }

  $scope.wait = false;
  defaultListController($scope, xlatService, $location.path());
}]);
