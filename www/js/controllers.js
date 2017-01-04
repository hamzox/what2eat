angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })
  .controller ('homeCtrl', homeCtrl)
  .controller ('myItemsCtrl', myItemsCtrl)
  .controller('modalController', modalController);

function modalController() {

}

function myItemsCtrl($scope, $ionicModal) {
  $scope.items=[];
  $ionicModal.fromTemplateUrl('templates/modalTemplate.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addItem = function(item) {
    //$scope.items.push({ name: item.name, restaurant: item.rest });
    $scope.modal.hide();
  };


}

function homeCtrl($scope, $firebaseObject,GetDataService) {

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

  $scope.showItems=[];
  $scope.getSelectedItems=[];
  $scope.isLoaded=false;

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  GetDataService.loadData(obj,$scope);

  $scope.value=8;
  $scope.selectModel=null;

  $scope.selectValue = function (selectModel) {

    $scope.showItems=[];
    $scope.getSelectedItems.unshift(selectModel);

    GetDataService.getRest(obj).then( function(res){
      for (var x in res['1']) {
        var iterator = res['1'][x]; //for getting second index of the data, ie: "{'results',Arrays[10]}"
        if ($scope.getSelectedItems[0].type == iterator.type) {
          $scope.showItems.push(iterator);
        }
      }
    })
  }
}





