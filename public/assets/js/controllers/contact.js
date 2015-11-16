'use strict';

angular.module('addressBookApp')
  .controller('ContactCtrl', function(Contact, $routeParams, $location) {
    var contact = this;

    contact.currentContact = Contact.get($routeParams.contactId);

    contact.formValues = {};

    contact.submit = function() {
      Contact.update($routeParams.contactId, contact.formValues);

      $location.path(contact.currentContact.showUrl);
    };

    return contact;
  });
