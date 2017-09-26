app.controller("LogsCtrl", ['$scope', 'xlatService','$http','$timeout', '$location',
  function ($scope, xlatService, $http, $timeout, $location) {

    $timeout( function(){

      $('#logs').dataTable({
        "bProcessing": true,
        //"bServerSide": true,
        "sAjaxSource": "verify/system/logs",
        "aoColumns": [
              { mData: 'email' } ,
              { mData: 'result' },
              { mData: 'c_date' }
            ]
      });

    }, 1000);
    defaultListController($scope, xlatService, $location.path());
  }]);
