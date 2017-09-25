app.controller("DashboardCtrl", ['$scope', 'xlatService', '$location',
  function ($scope, xlatService, $location) {

  defaultListController($scope, xlatService, $location.path());
}]);
