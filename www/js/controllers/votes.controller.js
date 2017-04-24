/**
 * Created by Hamza Khan on 4/22/2017.
 */

angular.module('starter.controllers')
  .controller ('votesController', votesController);


function votesController($scope, $firebaseObject,GetDataService,$rootScope,$localStorage,$ionicListDelegate,$timeout) {

  var vm = this;
  vm.voteCastObj = $localStorage.userVote;
  vm.onRefreshList = onRefreshList;
  vm.showOptionButton = showOptionButton;
  vm.onVote = onVote;

  //fetching json data from firebase url
  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  initVotes(); //initializing data

  $rootScope.$on('votesUpdated', function () {
    initVotes();
  });

  function initVotes() {
    $scope.showLoader = true;
    GetDataService.getVotes(obj,$scope)
      .then(function(res) {
      if (res){
        vm.voteList = formayOverKeys(res);
        $timeout(function () {
          $scope.$apply();
        },1000);
      }
    })
      .catch(function (res) {
      $scope.showLoader = false;
      console.log("There was an error will loading votes");
    })
  }

  function onRefreshList() {
    initVotes();
  }

  function formayOverKeys(keyObject) {
    var list=[];
    Object.keys(keyObject.votes).forEach(function(key) {
      list.push(keyObject.votes[key].data);
    });
    return list;
  }

  function showOptionButton(item) {
    return $localStorage.userId == item.user_id;
  }

  function onVote(item) {
    if (!vm.voteCastObj.isVoted) {
      var now = new Date();
      now.toISOString();

      var params = {
        user_id: item.user_id,
        item_name: item.item_name,
        item_id: item.item_id,
        item_rest: item.item_rest,
        date: item.date,
        voteCount:item.voteCount+1
      };
      var ref_poll = firebase.database().ref('/polls/'+item.user_id);

      ref_poll.child('data').set(params);
      $ionicListDelegate.closeOptionButtons();
      $timeout( function(){
        initVotes();
      }, 1000 ); //will close option button first and then after 1 second bring data from server
      vm.voteCastObj = {
        isVoted:true,
        item_id:item.item_id,
        time: now+""
      };
      $localStorage.userVote = vm.voteCastObj;
      console.log("SUCCESSFULLY CASTED!");
    }
    else {
      console.log("SORRY YOU GOT NO VOTES LEFT FOR TODAY");
    }
  }
}
