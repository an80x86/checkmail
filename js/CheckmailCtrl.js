app.controller("CheckmailCtrl", ['$scope', 'xlatService','$http', '$location',
  function ($scope, xlatService, $http, $location) {

  $scope.progresCiz = function (sts) {
      if (sts <= 25) return 'progress-striped';
      if (sts >= 26 && sts <= 50) return 'progress-danger';
      if (sts >= 51 && sts <= 75) return 'progress-warning';
      if (sts >= 76 && sts <= 99) return 'progress-success';
      if (sts >= 100) return 'progress-success';

      return 'progress-danger';
  }

  $scope.gizle = function() {
    $scope.alert = false;
  }

  $scope.goster = function() {
    $scope.alert = true;
  }

  $scope.Init = function() {
    $scope.wait = !false;
    $http({
      method : "GET",
      url : "system/"
    }).then(function mySuccess(response) {
      $scope.wait = false;
      var d = response.data;
      $scope.freey = d.freey;
      $scope.key = d.key;
      $scope.free = d.free;
    }, function myError(response) {
      $scope.wait = false;
      alert(response.statusText);
    });
  }

  $scope.Check = function() {
    if ($scope.email==='') return;
    $scope.wait = !false;

    $http({
      method : "GET",
      url : "system/incheck/"+$scope.email
    }).then(function mySuccess(response) {
      var d = response.data;
      $scope.freey = d.freey;
      $scope.key = d.key;
      $scope.free = d.free;
      if (d.sts === "ok") {

        if (response.data.sts2.result === "ok" || response.data.sts2.resultcode === 1) {
          $scope.alertclass = 'alert-success';
          var msg = xlatService.xlat('EMAIL_OK', null) + ' [' + $scope.email+']';
          $scope.alerticon = 'icon-ok';
          $scope.result = msg;
          $scope.email = '';
          $scope.goster();
          $scope.wait = false;
        } else {
          $scope.alertclass = 'alert-danger';
          var msg = xlatService.xlat('EMAIL_ERR', null) + ' [' + $scope.email+']';
          $scope.alerticon = 'icon-trash';
          $scope.result = msg;
          $scope.email = '';
          $scope.goster();
          $scope.wait = false;
        }
        $scope.Init();
      } else {
        $scope.result = d.sts; // no credit der!..
        $scope.email = '';
        $scope.goster();
        $scope.wait = false;
      }
    }, function myError(response) {
      $scope.wait = false;
      alert(response.statusText);
    });
  }

  $scope.wait = false;
  $scope.result = '';
  $scope.alert = false;
  $scope.alertclass = 'alert-success';
  $scope.alerticon = 'icon-trash';
  $scope.Init();
  defaultListController($scope, xlatService, $location.path());
}]);
