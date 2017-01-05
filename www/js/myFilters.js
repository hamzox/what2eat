angular.module('starter.filters', [])

.filter('reverseList', reverseList);

function reverseList() {
  return function(items) {
    return items.slice().reverse();
  };
}
