/**
 * Created by Hamza-PC on 4/22/2017.
 */
angular.module('starter.controllers')
  .controller('homeController', homeController);


function homeController($scope, $firebaseObject, GetDataService, $ionicPopup) {

  var vm = this;

  console.log(GetDataService);

  vm.getSelectedItems = [];
  $scope.isLoaded = false;

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  vm.value = 6;//hunger level value

  initRestaurantData();

  vm.checkbox = [
    {
      id: 1,
      name: "BBQ",
      state: false,
      icon: 'ion-fork'
    },
    {
      id: 2,
      name: 'Fast Food',
      state: false,
      icon: 'ion-pizza'
    },
    {
      id: 3,
      name: 'Sweet Something',
      state: false,
      icon: 'ion-icecream'
    },
    {
      id: 4,
      name: 'Desi Stuff',
      state: false,
      icon: 'ion-spoon'
    }
  ];

  vm.fns = {
    getSelectedCheckbox: function (checkbox) {
      var list = [];
      for (var x in checkbox) {
        if (checkbox[x].state) {
          list.push(checkbox[x]);
        }
      }
      return list;
    },
    showConfirm: function () {
      vm.showRest = onSuggestMe();
      if ($scope.isLoaded && vm.showRest.length > 0) {
        var hunger_level = vm.value;
        console.log(accHungerLevel(hunger_level));
        var magic = Math.floor(Math.random() * accHungerLevel(hunger_level).length) + 0;
        var suggest = accHungerLevel(hunger_level)[magic].name.toString();
        var confirmPopup = $ionicPopup.confirm({
          title: "It's " + suggest + "!",
          template: 'You can order "<b>' + suggest + '</b>" today!',
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Order',
              type: 'button-assertive',
              onTap: function () {
                console.log("Thank you for ordering!");
              }
            },
          ]
        });
      }
      else {
        var confirmPopup = $ionicPopup.confirm({
          title: "Sorry!",
          template: "<div class='text-center'>Please select something</div>",
          buttons: [
            {
              text: 'Cancel',
              type: 'button-assertive'
            }
          ]
        })
      }
    }
  };

  function onSuggestMe() {
    var list = [];
    vm.getSelectedItems = vm.fns.getSelectedCheckbox(vm.checkbox);
    for (var x in vm.getSelectedItems) {
      for (var y in $scope.allRest) {
        var iterator = $scope.allRest[y];
        var type = vm.getSelectedItems[x].name;
        if (type == iterator.type) {
          list.push(iterator);
        }
      }
    }
    return list;
  }

  function initRestaurantData() {
    GetDataService.getRest(obj,$scope).then(function (res) { //load all data from firebase
      $scope.allRest = [];
      for (var i in res['1']) {
        var iterator = res['1'][i];
        $scope.allRest.push(iterator);
      }
    });
  }

  function accHungerLevel(threshold) {
    var list = [];
    var selectedList = onSuggestMe();
    if (threshold > 6) {
      for (var counter in selectedList) {
        if (selectedList[counter].deliveryTime <= 30) {
          list.push(selectedList[counter]);
        }
      }
    }
    else if (threshold <= 6) {
      console.log("asdfas");
      for (var counter in selectedList) {
        list.push(selectedList[counter]);

      }
    }
    return list;
  }
}
