angular.module('starter.services', [])

  .service('GetDataService', function ($q) {
    var vm = this;

    vm.getRest = function (obj,scope) {
      var list=[];
      return $q(function (resolve,reject) {
        obj.$loaded().then(function(res) {
          if (res) {
              angular.forEach(res.restaurants, function(value, key) {
              list.push(key,value);
            });
            scope.isLoaded = true;
            console.log("Loaded!");

            resolve(list);
          }
          else {
            reject("Failure!");
          }
        })
      });
    }
    vm.getVotes = function (obj, scope) {
      var list = [];
      return $q(function (resolve, reject) {
        obj.$loaded().then(function (res) {
          if (res) {
            var polls = {};
            polls.votes = res.polls;
            scope.showLoader = false;
            resolve(polls);
          }
          else {
            reject("Failure!");
          }
        })
      });
    }

  });

