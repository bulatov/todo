angular.module('app')
.directive('listItem', function($timeout) {
    var template = angular.my.funcs.template('./blocks/list/list__list-item/list__list-item.html');

    template.link = function(scope, elem, attrs) {
        // for textarea autosize ..
        scope.$watch('tasks', function() {
            autosize($(elem.find('textarea')[0]));
        });

        elem.bind('keypress focusout', function(event) {
            if (event.keyCode === 13 || event.type === 'focusout') {
                event.preventDefault();
                elem.find('textarea').attr('disabled', '');
                /**
                 * hack: set transparent color to hide caret, then reset
                 * issue: after setting 'disabled' attribute at the moment caret is visible => caret still shows after
                 * */
                elem.find('textarea')[0].style.color = 'transparent';
                elem.find('textarea')[0].style.color = '';
            }
        });
    };

    template.controller = function($scope, $element, selectedFilter, $compile) {
        $scope.removeTask = function(index) {
            $scope.tasks.splice(index, 1);

            // for textarea autosize ..
            $timeout(function() {
                var tasks = $element.parent().find('textarea');
                for (let i = 0; i < tasks.length; i++) {
                    autosize.update($(tasks[i]));
                }
            });
        };
        $scope.editTask = function(index) {
            $element.find('textarea').removeAttr('disabled');
            $element.find('textarea')[0].focus();
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
