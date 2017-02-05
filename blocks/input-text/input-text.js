angular.module('app')
.directive('inputText', function() {
    var template = angular.my.funcs.template('./blocks/input-text/input-text.html');

    template.link = function(scope, elem, attrs) {
        elem.bind('keypress', function(event) {
            if (event.keyCode === 13 && scope.newTask) {
                scope.tasks.push({
                    description: scope.newTask,
                    completed: false
                });
                scope.newTask = '';
                scope.$apply(); // TODO: ?
                event.preventDefault();
            }
        });
    };

    return template;
});
