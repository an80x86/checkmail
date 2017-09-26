app.controller("TasksCtrl", ['$scope', 'xlatService','$http','$timeout', '$location',
  function ($scope, xlatService, $http, $timeout, $location) {

    $timeout( function(){

      $('#logs').dataTable({
        "bProcessing": true,
        //"bServerSide": true,
        "sAjaxSource": "verify/system/tasks",
        "aoColumns": [
              { mData: 'name' } ,
              { mData: 'val' },
              { mData: 'c_date' }
            ]
      });

    }, 1000);
    defaultListController($scope, xlatService, $location.path());
  }]);
