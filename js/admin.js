var app = angular.module("myApp", ["ngRoute","xlat"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "screens/admin/dashboard.html",
        controller : "DashboardCtrl"
    })
    .when("/checkmail", {
        templateUrl : "screens/admin/checkmail.html",
        controller : "CheckmailCtrl"
    })
    .when("/api", {
        templateUrl : "screens/admin/api.html",
        controller : "ApiCtrl"
    })
    .when("/logs", {
        templateUrl : "screens/admin/logs.html",
        controller : "LogsCtrl"
    })
    .when("/messages", {
        templateUrl : "screens/admin/messages.html",
        controller : "MessagesCtrl"
    })
    .when("/notifications", {
        templateUrl : "screens/admin/notifications.html",
        controller : "NotificationsCtrl"
    })
    .when("/tasks", {
        templateUrl : "screens/admin/tasks.html",
        controller : "TasksCtrl"
    })
    .when("/pass", {
        templateUrl : "screens/admin/pass.html",
        controller : "PassCtrl"
    });
});

var defaultListController = function ($scope, xlatService, param) {
  $scope.setCurrentLanguage = function(language) {
    xlatService.setCurrentLanguage(language);
  }

  $scope.checkServer = function() {
    $.ajax({url:  "verify/system/", success: function(result){
        if (JSON.parse(result).id === "0") {
            window.location.href = 'index.html';
        }
    }});
  }

  $scope.progresSts = function (sts) {
    if (sts <= 25) return 'progress-striped active';
    if (sts >= 26 && sts <= 50) return 'progress-danger progress-striped active';
    if (sts >= 51 && sts <= 75) return 'progress-warning progress-striped active';
    if (sts >= 76 && sts <= 99) return 'progress-success progress-striped active';
    if (sts >= 100) return 'progress-success';

    return 'progress-danger';
  }

  $scope.taskLength = function(obj) {
    var i = 0;
    obj.forEach(function(element) {
      if (element.val<100) i++;
    });

    return i;
  }

  $scope.nmLength = function(obj) {
    var i = 0;
    obj.forEach(function(element) {
      if (element.read_ === false || element.read_ == '0') i++;
    });

    return i;
  }

  $scope.setTitle = function(param) {
    if (param) {
      for(i=0;i<$scope.menus_list.length;i++) {
        var txt = $scope.menus_list[i].link.replace("#!", "/");
        if (txt === param) {
            return $scope.menus_list[i].txt;
        }
      }
    }
    return "";
  }

  // tasks
  $scope.tasks_list = [];
  $scope.tasks = $scope.taskLength($scope.tasks_list);
  $scope.tasks_all = $scope.tasks_list.length;
  $.ajax({url:  "verify/system/tasks", success: function(result){
      $scope.$apply(function () {
        var data = JSON.parse(result);
        $scope.tasks_list = data.aaData;
        $scope.tasks = $scope.taskLength($scope.tasks_list);
        $scope.tasks_all = $scope.tasks_list.length;
      });
  }});

  // notifications
  $scope.notifications_list = [];
  $scope.notifications = $scope.nmLength($scope.notifications_list);
  $scope.notifications_all = $scope.notifications_list.length;
  $.ajax({url:  "verify/system/notifications", success: function(result){
      $scope.$apply(function () {
        var data = JSON.parse(result);
        $scope.notifications_list = data.aaData;
        $scope.notifications = $scope.nmLength($scope.notifications_list);
        $scope.notifications_all = $scope.notifications_list.length;
      });
  }});

  // messages
  $scope.messages_list = [];
  $scope.messages = $scope.nmLength($scope.messages_list);
  $scope.messages_all = $scope.messages_list.length;
  $.ajax({url:  "verify/system/messages", success: function(result){
      $scope.$apply(function () {
        var data = JSON.parse(result);
        $scope.messages_list = data.aaData;
        $scope.messages = $scope.nmLength($scope.messages_list);
        $scope.messages_all = $scope.messages_list.length;
      });
  }});

  // menus
  $scope.menus_list = [
    {link: '#!', clsname: 'icon-dashboard', txt: 'Gösterge Paneli'},
    {link: '#!tasks', clsname: 'icon-tasks', txt: 'Görevler'},
    {link: '#!notifications', clsname: 'icon-bell-alt', txt: 'Bildirimler'},
    {link: '#!messages', clsname: 'icon-envelope', txt: 'Mesajlar'},
    {link: '#!checkmail', clsname: 'icon-edit', txt: 'Mail Doğrulama'},
    {link: '#!', clsname: 'icon-list-alt', txt: 'Çoklu Mail Doğrulama'},
    {link: '#!api', clsname: 'icon-cog', txt: 'Api'},
    {link: '#!logs', clsname: 'icon-picture', txt: 'Log'},
    {link: '#!pass', clsname: 'icon-tag', txt: 'Şifre Değiştir'},
    {link: 'logout.html', clsname: 'icon-off', txt: 'Çıkış'},
  ];

  if (!localStorage.userName) {
      window.location.href = 'index.html';
      return;
  }

  $scope.checkServer();

  $scope.User = localStorage.userName;
  var gelen = $scope.setTitle(param);
  $('#title1').text(gelen);
  $scope.setCurrentLanguage('tr');
}

app.controller("myAdmin", ['$scope', 'xlatService',
  function ($scope, xlatService, $location) {
    defaultListController($scope, xlatService, window.location.href.split('!').length > 1 ? window.location.href.split('!')[1] : '');
}]);
