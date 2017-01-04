angular.module('starter.services', [])

  .service('GetDataService' , function() {
    var vm = this;
    vm.loadData = function (obj,scope) {
      obj.$loaded().then(function() {
        scope.isLoaded=true;
        console.log("Loaded!");
      })
    };
    vm.getRest = function (obj) {
      var list=[];
      return new Promise(function (resolve,reject) {
        obj.$loaded().then(function(res) {
          if (res) {
            //To iterate the key/value pairs of the object, use angular.forEach()
            angular.forEach(res.restaurants, function(value, key) {
              list.push(key,value);
            });
            resolve(list);
          }
          else {
            reject("Failure!");
          }
        })
      });
    }
  })

  .service('SendDataService', function () {
    var vm=this;

    vm.sendData =function (obj) {

    }
  })
