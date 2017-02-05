angular.module('app', []);
angular.my = {
    funcs: {
        template: function(templateUrl) {
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                replace: true,
                transclude: true
            };
        }
    }
};
