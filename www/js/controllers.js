angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })

  .controller ('homeCtrl', function ($scope, $firebaseObject) {

    $scope.value=8;
    $scope.selectModel=null;
    $scope.typeOfMeals = [
      {
        id:1,
        type: "BBQ"
      },
      {
        id:2,
        type: "Fast Food"
      },
      {
        id:3,
        type:"Sweet something"
      },
      {
        id:4,
        type: "Desi Stuff"
      }
    ];

  })


  .controller('votesCtrl', function($scope) {

  })
  function homeCtrl() {

  }
