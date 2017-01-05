angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })

  .controller ('homeCtrl', homeCtrl)
  .controller ('myItemsCtrl', myItemsCtrl)


function myItemsCtrl($scope, $ionicModal, $localStorage) {
  $scope.deleteButtons=false;
  $scope.myItems = $localStorage.items; //bring data from local storage to view.
  console.log($scope.myItems);

  var addModalBool,editModalBool;

  addModalBool=false;
  editModalBool=false;


  $ionicModal.fromTemplateUrl('templates/modalTemplate.html', {scope: $scope})
    .then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addModal = function () {
    $scope.newItem = {};
    $scope.title="Add item";
    $scope.Button="Add";

    addModalBool=true;
    editModalBool=false;
  }
  $scope.editModal = function (onItem) {
    $scope.newItem = {};
    $scope.title="Edit item";
    $scope.Button="Edit";

    $scope.newItem.name = onItem.itemName;
    $scope.newItem.rest = onItem.itemRestaurant;
    $scope.newItem.comments = onItem.comments;
    $scope.newItem.id = onItem.id;

    addModalBool=false;
    editModalBool=true;

    console.log(onItem);
  }

  /**
   * items controller functions.
   */

  $scope.deleteItem = function (item) {
    var indexOfitem = $scope.myItems.indexOf(item);
    if (indexOfitem > -1) {
      $scope.myItems.splice(indexOfitem,1);
    }
    console.log($scope.myItems);
  }

  $scope.updateList = function(item) {
    if (addModalBool && !editModalBool && item.name != undefined) {
      addItem(item);
    }
    if (!addModalBool && editModalBool) {
      editItem(item);
    }

    item.name="";
    item.rest="";
    item.comments="";

    $scope.modal.hide();
  };

  /**
   * EO | items controller functions.
   */

  function addItem(item) {
    $localStorage.items.push({itemName: item.name, itemRestaurant: item.rest, itemComments: item.comments, id: Math.floor(Date.now())});
  }
  function editItem(item) {
    var id = item.id;
    for (var x in $localStorage.items) {
      if ($localStorage.items[x].id == id) {
        $localStorage.items[x].itemName=item.name;
        $localStorage.items[x].itemRestaurant= item.rest;
        $localStorage.items[x].comments= item.comments;
        $localStorage.items[x].id= Math.floor(Date.now());
      }
    }
  }
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





