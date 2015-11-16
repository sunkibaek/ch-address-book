'use strict';

angular.module('addressBookApp')
  .factory('Contact', function($http, $filter) {
    var contact = this;

    contact.all = [];

    contact.get = function(contactId) {
      return contact.all.filter(function(contactFromList) {
        return contactFromList.contactId === contactId;
      })[0];
    };

    contact.update = function(contactId, newContactData) {
      var contactToUpdate = contact.get(contactId);

      for (var prop in newContactData) {
        if (prop === 'phone') {
          newContactData[prop] =
            $filter('phone')(newContactData[prop], true);
        }

        contactToUpdate[prop] = newContactData[prop];
      }
    };

    var fetchData = function() {
      $http
        .get('/assets/contacts.json')
        .then(function(response) {
          contact.all = response.data.contacts.map(function(contactData){
            contactData.fullname =
              contactData.firstname + ' ' + contactData.lastname;
            contactData.contactId =
              contactData.fullname.toLowerCase().replace(' ', '-');
            contactData.showUrl = '/contacts/' + contactData.contactId;
            contactData.editUrl = contactData.showUrl + '/edit';

            return contactData;
          });
        }, function(response) {
          console.log(response.statusText);
        });
    };

    fetchData();

    return contact;
  });
