angular.module('starter.filters', [])

.filter('reverseList', reverseList);

function reverseList() {
  return function(items) {
    if (items != undefined) {
      return items.slice().reverse();
    }
  };
}
