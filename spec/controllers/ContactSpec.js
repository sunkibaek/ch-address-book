'use strict';

describe('ContactCtrl', function() {
  beforeEach(module('addressBookApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('currentContact', function() {
    it('gets contact of current url', function() {
      var ContactCtrl = $controller('ContactCtrl', {
        Contact: {
          all: [
            { contactId: 'test-contact' },
            { contactId: 'non-test-contact' }
          ],
          get: function() {
            return this.all[0];
          }
        },
        $routeParams: {
          contactId: 'test-contact'
        }
      });

      expect(ContactCtrl.currentContact.contactId)
        .toEqual('test-contact');
    });
  });

  describe('formValues', function() {
    it('initializes with an empty object', function() {
      var ContactCtrl = $controller('ContactCtrl');

      expect(ContactCtrl.formValues).toEqual({});
    });
  });

  describe('submit()', function() {
    it('updates the data and redirect to show page', function() {
      var currentUrl;

      var ContactCtrl = $controller('ContactCtrl', {
        Contact: {
          all: [
            { updated: false, showUrl: '/contacts/test-name' }
          ],
          update: function(contactId, formValues) {
            this.all[0].updated = true;
          },
          get: function() {
            return this.all[0];
          }
        },
        $location: {
          path: function(url) {
            if (url) {
              currentUrl = url;
            } else {
              return currentUrl;
            }
          }
        },
        $routeParams: {
          contactId: 'test-name'
        }
      });

      ContactCtrl.submit();

      expect(ContactCtrl.currentContact.updated)
        .toEqual(true);
      expect(currentUrl).toEqual('/contacts/test-name');
    });
  });
});
