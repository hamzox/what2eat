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
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })






    .state('app.single', {
      url: '/search/:restdetail',
      views: {
        'menuContent': {
          templateUrl: 'templates/w2e-rest-detail.html'
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
    .state('app.votes',{
      url:'/votes',
      views: {
        'menuContent': {
          templateUrl: 'templates/votes.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/home');
});
