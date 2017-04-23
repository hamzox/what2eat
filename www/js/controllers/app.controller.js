/**
 * Created by Hamza-PC on 4/22/2017.
 */
angular.module('starter.controllers')

  .controller ('AppCtrl', AppCtrl);

function AppCtrl($scope,$localStorage,AppService) {

  var makeId = Math.floor(Date.now());
  generateUserId(makeId); // set user id to local storage on first run of application.
  AppService.checkVoteTime();
  function generateUserId (id) {
    if (!$localStorage.hasOwnProperty("userId")) {
      $localStorage.userId = id;
      $localStorage.userVote = { isVoted:false }; //user has never voted
      sendData(id);
    }
    $scope.myId = $localStorage.userId;
  }

  function sendData(uid) {
    var ref = firebase.database().ref('/users');
    var info = [{
      user : uid
    }];
    ref.child(uid).set(info);
  }
}
