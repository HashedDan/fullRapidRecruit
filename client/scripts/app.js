'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html', data: {text: "Overview", visible: false } } },
        { name: 'lists', state: { url: '/lists', parent: 'dashboard', templateUrl: 'views/dashboard/lists.html', data: {text: "Lists", visible: true } } },
        { name: 'new-list', state: { url: '/new-list', parent: 'dashboard', templateUrl: 'views/dashboard/new-list.html', data: {text: "New List", visible: false } } },
        { name: 'events', state: { url: '/events', parent: 'dashboard', templateUrl: 'views/dashboard/events.html', data: {text: "Events", visible: true } } },
        { name: 'new-event', state: { url: '/new-event', parent: 'dashboard', templateUrl: 'views/dashboard/new-event.html', data: {text: "New Event", visible: false } } },
        { name: 'votes', state: { url: '/votes', parent: 'dashboard', templateUrl: 'views/dashboard/votes.html', data: {text: "Vote", visible: true } } },
        { name: 'new-vote', state: { url: '/new-vote', parent: 'dashboard', templateUrl: 'views/dashboard/new-vote.html', data: {text: "New Vote", visible: false } } },
        { name: 'new-batch-vote', state: { url: '/new-batch-vote', parent: 'dashboard', templateUrl: 'views/dashboard/new-batch-vote.html', data: {text: "New Batch Vote", visible: false } } },
        { name: 'vote-history', state: { url: '/vote-history', parent: 'dashboard', templateUrl: 'views/dashboard/vote-history.html', data: {text: "Vote History", visible: false } } },
        { name: 'my-org', state: { url: '/my-org', parent: 'dashboard', templateUrl: 'views/dashboard/my-org.html', data: {text: "My Org", visible: true } } },
        { name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }
    ];

angular.module('yapp', [
                'ui.router',
                'snap'
                // 'ngAnimate'
            ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/dashboard', '/dashboard/overview');
            $urlRouterProvider.otherwise('/login');

            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        });
