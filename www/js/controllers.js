angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })


  .controller ('homeCtrl', function ($scope, $firebaseObject) {

    $scope.getSelectedItems=[];

    $scope.isLoaded=false;

    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);

    loadData(obj,$scope);

    //fetching json data from firebase url
    $scope.data = obj;
    console.log($scope.data);


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

function loadData(obj,scope) {
  obj.$loaded().then(function() {

    console.log("Loaded record!");
    scope.isLoaded=true;

    // To iterate the key/value pairs of the object, use angular.forEach()
    angular.forEach(obj, function(value, key) {
      console.log(key, value);
    });
  })
}


