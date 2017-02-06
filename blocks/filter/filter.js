angular.module('app')
.value('selectedFilter', {})
.directive('filter', function() {
    var template = angular.my.funcs.template('./blocks/filter/filter.html');
    template.controller = function($scope, selectedFilter) {
        $scope.filters = ['View All', 'Active', 'Completed'];
        $scope.states = {
            selected: 0
        };
        selectedFilter.states = $scope.states;
    };
    return template;
});
