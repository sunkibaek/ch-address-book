'use strict';

describe('phone filter', function () {

  var $filter;

  beforeEach(function () {
    module('addressBookApp');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  describe('without options', function() {
    it('should format phone number from 6041231234 to (604) 123-1234',
      function () {
        var number = '6041231234';

        var result = $filter('phone')(number);

        expect(result).toEqual('(604) 123-1234');
      }
    );

    it('should return empty string when there is no input',
      function () {
        var result = $filter('phone')();

        expect(result).toEqual('');
      }
    );
  });

  describe('with reverse option', function() {
    it('should turn (604) 123-1234 into 6041231234',
      function() {
        var formattedPhoneNumber = '(604) 123-1234';

        var result = $filter('phone')(formattedPhoneNumber, true);

        expect(result).toEqual('6041231234');
      }
    );
  });
});
