'use strict';

describe('Contact factory', function () {
  var Contact;
  var $httpBackend;
  var testContactData = {
    "firstname": "Testfirstname",
    "lastname": "Testlastname",
    "phone": "6041231234",
    "address": "289 Test St., Vancouver, BC, V3M 2L7",
    "email": "test@example.com"
  };

  beforeEach(function () {
    module('addressBookApp');
    inject(function ($injector) {
      Contact = $injector.get('Contact');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  describe('get', function() {
    it('should get contact of the contactId', function() {
      Contact.all = [
        { contactId: 'test-contact' },
        { contactId: 'another-contact' }
      ];

      var testContact = Contact.get('test-contact');

      expect(testContact).toEqual({ contactId: 'test-contact' });
    });
  });

  describe('update', function() {
    it('should update contact record', function() {
      Contact.all = [{
        contactId: 'test-contact',
        phone: '6041231234',
        address: '289 Test St., Vancouver, BC, V3M 2L7',
        email: 'test@example.com'
      }];

      Contact.update('test-contact', {
        phone: '(604) 987-6543',
        address: '123 Test Ave',
        email: 'another_test@example.com'
      })

      expect(Contact.all[0].phone).toEqual('6049876543');
      expect(Contact.all[0].address).toEqual('123 Test Ave');
      expect(Contact.all[0].email).toEqual('another_test@example.com');
    });
  });

  describe('fetchData', function() {
    it('should have basic attributes',
      function () {
        $httpBackend.when('GET', '/assets/contacts.json')
          .respond({"contacts": [testContactData]});
        $httpBackend.flush();

        var testContact = Contact.all[0];

        expect(testContact.firstname).toEqual('Testfirstname');
        expect(testContact.lastname).toEqual('Testlastname');
        expect(testContact.phone).toEqual('6041231234');
        expect(testContact.address).toEqual(
          '289 Test St., Vancouver, BC, V3M 2L7');
        expect(testContact.email).toEqual('test@example.com');
      }
    );

    it('should have extra attributes',
      function () {
        $httpBackend.when('GET', '/assets/contacts.json')
          .respond({"contacts": [testContactData]});
        $httpBackend.flush();

        var testContact = Contact.all[0];

        expect(testContact.fullname).toEqual('Testfirstname Testlastname');
        expect(testContact.contactId).toEqual('testfirstname-testlastname');
        expect(testContact.showUrl).toEqual(
          '/contacts/testfirstname-testlastname');
        expect(testContact.editUrl).toEqual(
          '/contacts/testfirstname-testlastname/edit');
      }
    );
  });
});
