/**
 * Created by Hamza Khan on 4/22/2017.
 */

angular.module('starter.controllers')
.controller('myItemsCtrl',myItemsCtrl);

function myItemsCtrl($scope, $ionicModal, $localStorage, $ionicPopup, $rootScope,$ionicListDelegate) {

  var vm = this;
  var addModalBool,editModalBool;

  vm.addModal = addModal;
  vm.editModal = editModal;
  vm.deleteItem = deleteItem;
  vm.onPollItem =onPollItem;

  vm.myItems = $localStorage.items; //bring data from local storage to view.

  //some important initializations.
  addModalBool=false;
  editModalBool=false;

  $scope.deleteButtons=false;

  /**
   * Modal stuff.
   */

  initIonicModal();

  function initIonicModal() {
    $ionicModal.fromTemplateUrl('templates/modalTemplate.html', {scope: $scope})
      .then(function(modal) {
        $scope.modal = modal;
      });
  }

  function addModal() {
    $scope.newItem = {};
    $scope.title="Add item";
    $scope.Button="Add";

    addModalBool=true;
    editModalBool=false;
  }

  function editModal(onItem) {
    $scope.newItem = {};
    $scope.title="Edit item";
    $scope.Button="Save";
    $scope.newItem.name = onItem.itemName;
    $scope.newItem.rest = onItem.itemRestaurant;
    $scope.newItem.comments = onItem.comments;
    $scope.newItem.id = onItem.id;
    addModalBool=false;
    editModalBool=true;
  }

  function deleteItem(item) {
    var indexOfitem = vm.myItems.indexOf(item);
    if (indexOfitem > -1) {
      vm.myItems.splice(indexOfitem,1);
    }
  }

  $scope.showConfirm = function(item) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'ARE YOU SURE?',
      template: 'Are you sure you want to delete this item?',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Delete',
          type: 'button-assertive',
          onTap: function() {
            vm.deleteItem(item);
          }
        }
      ]
    });
  };

  /**
   * EO | Modal stuff.
   */

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
  }; //update list to localstorage

  function addItem(item) {
    if (!$localStorage.hasOwnProperty("items")) {
      $localStorage.items =[];
      $localStorage.items.push({itemName: item.name, itemRestaurant: item.rest, itemComments: item.comments, id: Math.floor(Date.now())});
    }
    else {
      $localStorage.items.push({itemName: item.name, itemRestaurant: item.rest, itemComments: item.comments, id: Math.floor(Date.now())});
    }
    vm.myItems = $localStorage.items; //for new user to show on view.
  } //add item in local storage

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
  } //edit item in local storage

  function onPollItem(item) {
    var now = new Date();
    now.toISOString();

    //var vote_id = 'vt_'+item.id;

    var params = {
      user_id: $localStorage.userId,
      item_name: item.itemName,
      item_id: item.id,
      item_rest: item.itemRestaurant,
      date: now+"",
      voteCount:1
    };

    console.log(params);
    var ref_poll = firebase.database().ref('/polls/'+$localStorage.userId);
    ref_poll.child('data').set(params);

    $ionicListDelegate.closeOptionButtons();
    $rootScope.$broadcast('votesUpdated',params);
  }
}
