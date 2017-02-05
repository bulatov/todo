angular.module('app')
.directive('filter', function() {
    return angular.my.funcs.template('./blocks/filter/filter.html');
});
