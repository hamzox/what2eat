angular.module('starter.routes',[])
  .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('app.myItems', {
      url: '/myItems',
      views: {
        'menuContent': {
          templateUrl: 'templates/myItems.html',
          controller: 'myItemsCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/home');
});
