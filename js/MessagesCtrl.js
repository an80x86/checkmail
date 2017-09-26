app.controller("MessagesCtrl", ['$scope', 'xlatService','$http','$timeout', '$location',
  function ($scope, xlatService, $http, $timeout, $location) {

    $timeout( function(){

      $('#logs').dataTable({
        "bProcessing": true,
        //"bServerSide": true,
        "sAjaxSource": "system/notifications",
        "aoColumns": [
              { mData: 'msg' } ,
              { mData: 'read_' },
              { mData: 'c_date' }
            ]
      });

    }, 1000);
    defaultListController($scope, xlatService, $location.path());
  }]);
