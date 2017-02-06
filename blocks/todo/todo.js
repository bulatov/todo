angular.module('app')
.directive('todo', function() {
    var template = angular.my.funcs.template('./blocks/todo/todo.html');
    template.controller = function($scope, $http) {
        $scope.tasks = [];
        
        if (!localStorage.todo) {
            localStorage.todo = '{}';
        }

        var token = JSON.parse(localStorage.todo).token;
        var url = 'https://api.myjson.com/bins/';

        if (!token) {
            $http.post('https://api.myjson.com/bins/', {})
            .then(function(response) {
                var uri = response.data.uri;
                token = uri.slice(uri.lastIndexOf('/') + 1);
                localStorage.todo = JSON.stringify({
                    token: token
                });
                url += token;
                console.log(url);
            })
            .then(function() {
                $scope.$watch('tasks', function() {
                    $http.put(url, {
                        tasks: $scope.tasks
                    });
                }, true);
            });
        } else {
            url += token;
            console.log(url);

            $http.get(url)
            .then(function(response) {
                $scope.tasks = response.data.tasks || [];
            })
            .then(function() {
                $scope.$watch('tasks', function() {
                    $http.put(url, {
                        tasks: $scope.tasks
                    });
                }, true);
            });
        }
    };
    return template;
});
