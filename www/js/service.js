angular.module('starter.services', [])

  .service('GetDataService' ,function() {
    var vm = this;

    vm.getRest = function (obj,scope) {
      var list=[];
      return new Promise(function (resolve,reject) {
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
  })

