angular.module('app')
.directive('listItem', function() {
    var template = angular.my.funcs.template('./blocks/list/list__list-item/list__list-item.html');

    template.link = function(scope, elem, attrs) {
        elem.bind('keypress focusout', function(event) {
            if (event.keyCode === 13 || event.type === 'focusout') {
                event.preventDefault();
                elem.find('input').attr('disabled', '');
                /**
                 * hack: set (color + 1) color, reset after 0-timeout
                 * issue: after setting 'disabled' attribute vertical cursor still shows
                 * */
                elem.find('input')[0].style.color = '#ddddde';
                setTimeout(function() {
                    elem.find('input')[0].style.color = '';
                }, 0);
            }
        });
    };

    template.controller = function($scope, $element, selectedFilter) {
        $scope.removeTask = function(index) {
            $scope.tasks.splice(index, 1);
        };
        $scope.editTask = function(index) {
            $element.find('input').removeAttr('disabled');
            $element.find('input')[0].focus();
        };
        $scope.completeTask = function(index) {
            $scope.tasks[index].completed = !$scope.tasks[index].completed;
        };
        $scope.visibleByFilter = function(index) {
            var task = $scope.tasks[index];
            var selected = selectedFilter.states.selected;
            return selected === 0 || selected === 1 && !task.completed || selected === 2 && task.completed;
        };
    };

    return template;
});
