'use strict';
angular.module('myApp', [
  'ngRoute',
  'listViewTop',
  'voteView',
  'signInView',
  'myOrgView',
  'myApp.version'
]);

var app = angular.module('myApp', [
  'ngRoute',
  'listViewTop',
  'voteView',
  'signInView',
  'myOrgView',
  'myApp.version'
]);

app.controller('myCtrl', function($scope, $http) {
        $scope.showModal = false;
        $scope.open = function(param){
                $scope.list_content = '';
                $http.get('http://34.203.219.137/g4/recruits?list='+param)
                        .success(function(result) {
                            $scope.list_content = result;
                            console.log($scope.list_content);
                            document.getElementById('list-cards').innerHTML = '';
                            tablePrinter($scope.list_content);
                        })
                        .error(function(data, status) {
                            $log.info(data);
                        });




        $scope.showModal = !$scope.showModal;
        };
});

function tablePrinter(param) {
        document.getElementById('list-table').innerHTML = '<table id="list-table-el" class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp is-upgraded no-hover"><tr><th class="mdl-data-table__cell--non-numeric">First Name</th><th class="mdl-data-table__cell--non-numeric">Last Name</th><th class="mdl-data-table__cell--non-numeric">Email</th>.<th>Creation</th></tr>';
        for (var i = 0; i < param.length;++i) {

                 document.getElementById('list-table-el').innerHTML += '<tr><td class="mdl-data-table__cell--non-numeric">'+param[i].recruit_first+'</td><td class="mdl-data-table__cell--non-numeric">'+param[i].recruit_last+'</td><td class="mdl-data-table__cell--non-numeric">'+param[i].recruit_email+'</td><td>'+param[i].recruit_creation+'</td></tr>';


        }
        //document.getElementById('list-grid').innerHTML += '</table>';

}
