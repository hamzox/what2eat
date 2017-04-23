/**
 * Created by Hamza-PC on 4/22/2017.
 */

angular.module('starter.controllers')
  .controller('searchCtrl',searchCtrl)

function searchCtrl($scope, GetDataService,$firebaseObject) {

  $scope.allRest=[];
  $scope.searchRest=[];
  $scope.searchVal= "";
  $scope.isLoaded=false;
  // $scope.getRest=[];

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  GetDataService.getRest(obj,$scope).then( function(res) {
    if (res) {
      for (var x in res['1']) {
        var iterator = res['1'][x];
        $scope.allRest.push(iterator);
        $scope.searchRest.push(
          {
            name: iterator.name, 
            type: iterator.type, 
            time: iterator.deliveryTime, 
            imgSrc: iterator.imgSrc
          }); //for searching according to name,type and time only in the search bar.
      }
      // console.log($scope.searchRest);
      $scope.getRest=$scope.searchRest;
      console.log($scope.getRest);
    }
  });

  function filterDelivery(items) {
    var newArr = items.filter(function (item) {

    });
  }
}
