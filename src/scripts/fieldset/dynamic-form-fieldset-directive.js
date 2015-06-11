(function() {
    'use strict';

    var dynamicFormFieldset = function($templateCache, AngularDynamicFormCustomInputViewUrl) {
        return {
            restrict: 'E',
            scope: {
                field:              '=',
                model:              '=',
                errors:             '=',
                show_validation:    '=showValidation',
                config:             '=',
                style_config:       '=styleConfig',
                onChange:           '&',
                onBlur:             '&'
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
            link: function(scope) {

                // set input view template
                scope.input_view_template = 'angular-dynamic-form/views/inputs/' + scope.field.type + '.html';

                if (_.isUndefined($templateCache.get(scope.input_view_template))) {
                    scope.input_view_template = AngularDynamicFormCustomInputViewUrl + scope.field.type + '.html';
                }

                // watchers
                scope.$watchCollection('field', function(val) {
                    console.log(val);
                });

                // watchers
                scope.$watchCollection('model', function(val) {
                    if (!_.isUndefined(val)) {
                        // extract fist item from model as value
                        scope.value = _.pluck([scope.model], scope.field.name)[0];
                    }
                });
            },
            templateUrl: 'angular-dynamic-form/views/dynamic-form-fieldset.html'
        };
    };

    dynamicFormFieldset.$inject = ['$templateCache', 'AngularDynamicFormCustomInputViewUrl'];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
