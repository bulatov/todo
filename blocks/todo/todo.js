angular.module('app')
.directive('todo', function() {
    var template = angular.my.funcs.template('./blocks/todo/todo.html');
    template.controller = function($scope) {
        $scope.tasks = [];
    };
    return template;
});
