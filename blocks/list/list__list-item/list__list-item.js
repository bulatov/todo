angular.module('app')
.directive('listItem', function() {
    var template = angular.my.funcs.template('./blocks/list/list__list-item/list__list-item.html');

    template.link = function(scope, elem, attrs) {
        elem.bind('keypress', function(event) {
            if (event.keyCode === 13) {
                elem.find('li').removeAttr('contenteditable');
                event.preventDefault();
            }
        });
    };

    template.controller = function($scope, $element) {
        $scope.removeTask = function(index) {
            $scope.tasks.splice(index, 1);
        };
        $scope.editTask = function(index) {
            $element.find('li').attr('contenteditable', '');
            $element.find('li')[0].focus();
        };
        $scope.completeTask = function(index) {
            $scope.tasks[index].completed = !$scope.tasks[index].completed;
        };
    };
    return template;
});
