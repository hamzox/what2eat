/**
 * Created by Hamza Khan on 4/23/2017.
 */
angular.module('starter.services')

  .service('AppService' ,function($localStorage) {
    var vm=this;

    var ONE_DAY = 24*60 * 60 * 1000; /* ms */
    vm.checkVoteTime = function () {
      setInterval(function () {
        var vote_date = new Date($localStorage.userVote.time);
        var now = new Date();
        var diff=new Date(now.getDate()-vote_date.getDate());
        // console.log($moment);

      },5000)
    }

  });

