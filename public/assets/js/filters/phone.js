'use strict';

angular.module('addressBookApp')
  .filter('phone', function() {
    return function(input, reverse) {
      if (!input) return '';

      if (reverse) {
        return input.replace(/\W/g, '');
      } else {
        var areaCode = input.slice(0, 3);
        var firstThree = input.slice(3, 6);
        var lastFour = input.slice(6, 10);

        return '(' + areaCode + ') ' + firstThree + '-' + lastFour;
      }
    };
  });
