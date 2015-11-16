'use strict';

angular.module('addressBookApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'assets/templates/home.html'
        })
        .when('/contacts/:contactId', {
          templateUrl: 'assets/templates/contact-detail.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/contacts/:contactId/edit', {
          templateUrl: 'assets/templates/contact-detail-form.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .otherwise({
          redirectTo: '/'
        });
  }]);
