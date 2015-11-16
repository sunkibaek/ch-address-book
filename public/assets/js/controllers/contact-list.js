'use strict';

angular.module('addressBookApp')
  .controller('ContactListCtrl', function(Contact, $location) {
    var contactList = this;

    contactList.list = Contact;

    contactList.isActive = function(url) {
      return url === $location.url();
    };

    return contactList;
  });
