angular.module('starter.controllers', [])

  .controller ('AppCtrl', AppCtrl)
  .controller ('homeCtrl', homeCtrl)
  .controller ('myItemsCtrl', myItemsCtrl)
  .controller ('searchCtrl', searchCtrl)

function AppCtrl($scope,$localStorage) {

  var makeId = Math.floor(Date.now());
  generateUserId(makeId); // set user id to local storage on first run of application.

  function generateUserId (id) {
    if (!$localStorage.hasOwnProperty("userId")) {
      $localStorage.userId = id;
      sendData(id);
    }
    $scope.myId = $localStorage.userId;
  }
  function sendData(uid) {
    var ref = firebase.database().ref('/users');
    var info = [{
      user : uid
    }]
    ref.child(uid).set(info);
  }
}

function homeCtrl($scope, $firebaseObject,GetDataService) {

  $scope.showItems=[];
  $scope.getSelectedItems=[];
  $scope.isLoaded=false;

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  GetDataService.loadData(obj,$scope);

  $scope.value=8;
  $scope.selectModel=null;
  $scope.checkbox = [
    {
      id:1,
      name: "BBQ",
      state: false,
      icon: 'ion-fork'
    },
    {
      id:2,
      name: 'Fast Food',
      state: false,
      icon: 'ion-pizza'
    },
    {
      id:3,
      name: 'Sweet Something',
      state: false,
      icon: 'ion-icecream'
    },
    {
      id:4,
      name: 'Desi Stuff',
      state: false,
      icon: 'ion-spoon'
    }
  ]

  $scope.goFunction = function () {

    $scope.showItems=[];
    $scope.getSelectedItems = $scope.fns.getSelectedCheckbox($scope.checkbox);

    GetDataService.getRest(obj).then( function(res) {

      for (var x in $scope.getSelectedItems) {
        for (var y in res['1']) {

          var iterator = res['1'][y]; //for getting second index of the data, ie: "{'results',Arrays[10]}"
          var type = $scope.getSelectedItems[x].name;

          if (type == iterator.type) {
            $scope.showItems.push(iterator);
          }

        }
      }
    })
  }

  $scope.fns = {
    getSelectedCheckbox : function (checkbox) {
      var list = [];
      for (var x in checkbox) {
        if (checkbox[x].state) {
          list.push(checkbox[x]);
        }
      }
      return list;
    }
  };
}

function myItemsCtrl($scope, $ionicModal, $localStorage) {
  var addModalBool,editModalBool;

  //some important initializations.
  addModalBool=false;
  editModalBool=false;

  $scope.deleteButtons=false;

  $scope.myItems = $localStorage.items; //bring data from local storage to view.

  /**
   * Modal stuff.
   */

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
  }
  /**
   * EO | Modal stuff.
   */


  /**
   * items controller functions.
   */

  $scope.deleteItem = function (item) {
    var indexOfitem = $scope.myItems.indexOf(item);
    if (indexOfitem > -1) {
      $scope.myItems.splice(indexOfitem,1);
    }
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
    if (!$localStorage.hasOwnProperty("items")) {
      $localStorage.items =[];
      $localStorage.items.push({itemName: item.name, itemRestaurant: item.rest, itemComments: item.comments, id: Math.floor(Date.now())});
    }
    else {
      $localStorage.items.push({itemName: item.name, itemRestaurant: item.rest, itemComments: item.comments, id: Math.floor(Date.now())});
    }
    $scope.myItems = $localStorage.items; //for new user to show on view.
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

function searchCtrl($scope, GetDataService,$firebaseObject) {

  $scope.allRest=[];
  $scope.searchVal= "";

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  GetDataService.getRest(obj).then( function(res) {
    for (var x in res['1']) {
      var iterator = res['1'][x];
      $scope.allRest.push(iterator);
    }
  })
}
