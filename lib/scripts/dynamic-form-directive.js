"use strict";

(function() {

    var dynamicForm = function() {

        return {
            restrict: 'E',
            scope: {
                model:              "=",
                fields:             "=",
                form_config:        "=config",
                form_field_config:  "=fieldConfig",
                form_style_config:  "=styleConfig",
                groups_config:      "=groupsConfig",
                submit_steps:       "=submitSteps",
                onSubmitComplete:   "&",
                onCancel:           "&",
                onClear:            "&",
                onError:            "&",
                onChange:           "&",
                onBlur:             "&"
            },
            controller: 'DynamicFormCtrl as ctrl',
            link: function(scope, element, attrs, ctrl) {

                element.addClass('dynamic-form');

                // set form template
                if (!_.isUndefined(scope.groups_config)) {
                    scope.has_groups = true;
                    scope.form_view_template = "views/dynamic-form-groups.html";
                    //scope.form_view_template = "/angular-dynamic-form/lib/views/dynamic-form-groups.html";
                } else {
                    scope.has_groups = false;
                    scope.form_view_template = "views/dynamic-form-no-groups.html";
                    //scope.form_view_template = "/angular-dynamic-form/lib/views/dynamic-form-no-groups.html";
                }

                // remove function scope properties if they don't exist as attrs
                /*if (!_.has(attrs, 'onSubmitComplete')) {
                    delete scope.onSubmitComplete;
                }
                if (!_.has(attrs, 'onCancel')) {
                    delete scope.onCancel;
                }
                if (!_.has(attrs, 'onClear')) {
                    delete scope.onClear;
                }
                if (!_.has(attrs, 'onError')) {
                    delete scope.onError;
                }*/
            },
            //templateUrl: '/angular-dynamic-form/lib/views/dynamic-form.html'
            templateUrl: 'views/dynamic-form.html'
        };
    };

    dynamicForm.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicForm', dynamicForm);

})();
