'use strict';

describe('ContactListCtrl', function() {
  beforeEach(module('addressBookApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('list', function() {
    it('gets list of contacts', function() {
      var ContactListCtrl = $controller('ContactListCtrl', { Contact: {
        all: []
      }});

      expect(ContactListCtrl.list).toEqual({all: []});
    });
  });

  describe('isActive', function() {
    it('tells if the given url is the current one or not',
      function() {
        var ContactListCtrl = $controller('ContactListCtrl', { $location: {
          url: function() {
            return '/contacts/testfirst-testlast';
          }
        }});

        expect(ContactListCtrl.isActive('/contacts/testfirst-testlast'))
          .toEqual(true);
        expect(
          ContactListCtrl.isActive('/contacts/something-else'))
          .toEqual(false);
      }
    );
  });
});
