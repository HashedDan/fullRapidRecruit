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
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false, admin: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false, admin: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false, admin: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html', data: {text: "Overview", visible: false, admin: false } } },
        { name: 'lists', state: { url: '/lists', parent: 'dashboard', templateUrl: 'views/dashboard/lists.html', data: {text: "Lists", visible: true, admin: false } } },
        { name: 'new-list', state: { url: '/new-list', parent: 'dashboard', templateUrl: 'views/dashboard/new-list.html', data: {text: "New List", visible: false, admin: true } } },
        { name: 'events', state: { url: '/events', parent: 'dashboard', templateUrl: 'views/dashboard/events.html', data: {text: "Events", visible: true, admin: false } } },
        { name: 'new-interaction', state: { url: '/new-interaction', parent: 'dashboard', templateUrl: 'views/dashboard/new-interaction.html', data: {text: "New Interaction", visible: false, admin: false } } },
        { name: 'new-event', state: { url: '/new-event', parent: 'dashboard', templateUrl: 'views/dashboard/new-event.html', data: {text: "New Event", visible: false, admin: true } } },
        { name: 'active-votes', state: { url: '/active-votes', parent: 'dashboard', templateUrl: 'views/dashboard/active-votes.html', data: {text: "Active Votes", visible: true , admin: false } } },
        { name: 'vote-editor', state: { url: '/vote-editor', parent: 'dashboard', templateUrl: 'views/dashboard/vote-editor.html', data: {text: "Vote Editor", visible: true,  admin: true } } },
        { name: 'new-vote', state: { url: '/new-vote', parent: 'dashboard', templateUrl: 'views/dashboard/new-vote.html', data: {text: "New Vote", visible: false,  admin: true } } },
        { name: 'restricted-page', state: { url: '/restricted-page', parent: 'dashboard', templateUrl: 'views/dashboard/restricted-page.html', data: {text: "Restricted Page", visible: false,  admin: false } } },
        { name: 'admin-options', state: { url: '/admin-options', parent: 'dashboard', templateUrl: 'views/dashboard/admin-options.html', data: {text: "Admin Options", visible: false, admin: true } } },
        { name: 'new-batch-vote', state: { url: '/new-batch-vote', parent: 'dashboard', templateUrl: 'views/dashboard/new-batch-vote.html', data: {text: "New Batch Vote", visible: false, admin: true } } },
        { name: 'vote-history', state: { url: '/vote-history', parent: 'dashboard', templateUrl: 'views/dashboard/vote-history.html', data: {text: "Vote History", visible: false, admin: false } } },
        { name: 'my-org', state: { url: '/my-org', parent: 'dashboard', templateUrl: 'views/dashboard/my-org.html', data: {text: "My Org", visible: true, admin: false } } }
        //,{ name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }
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
