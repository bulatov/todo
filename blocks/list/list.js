angular.module('app')
.directive('list', function() {
    var template = angular.my.funcs.template('./blocks/list/list.html');
    return template;
});
