"use strict";

(function() {

    var dynamicForm = function() {

        return {
            restrict: 'E',
            scope: {
                form_id:        "@formId",
                config:         "=",
                first:          "=",
                field_config:   "=fieldConfig",
                groups_config:  "=groupsConfig",
                model:          "=",
                error_log:      "=errorLog", // TODO: change to errors & change $scope.errors in the controller to this.errors
                onSubmit:       "&",
                preSubmit:      "&",
                onCancel:       "&",
                autoSubmit:     "="
            },
            controller: 'DynamicFormCtrl as ctrl',
            link: function(scope, element, attrs, ctrl) {

                element.addClass('dynamic-form');

                // set controller props
                ctrl.config = scope.config;

                // remove function scope properties if they don't exist as attrs
                if (!_.has(attrs, 'onSubmit')) {
                    delete scope.onSubmit;
                }
                if (!_.has(attrs, 'preSubmit')) {
                    delete scope.preSubmit;
                }
                if (!_.has(attrs, 'onCancel')) {
                    delete scope.onCancel;
                }

                //---------------------
                // watchers
                //---------------------

                // first

                scope.$watch('first', function(newVal, oldVal) {
                    scope.is_active = !_.isUndefined(newVal) && newVal ? false : true;
                });

                // auto submit

                if (!_.isUndefined(scope.autoSubmit)) {
                    scope.$watch('autoSubmit', function(newVal, oldVal) {
                        if (!_.isUndefined(newVal) && newVal) {
                            ctrl.onSubmit(); // submit
                        }
                    });
                }

                // errors // TODO: clean this up

                scope.$watch('errors', function(new_value, old_value) {
                    if (!_.isUndefined(new_value) && !_.isUndefined(scope.error_log)) {
                        if (_.has(new_value, 'scope_id')) {
                            scope.error_log[scope.form_id] = true;
                        } else {
                            scope.error_log[scope.form_id] = false;
                        }
                    }
                }, true);
            },
            templateUrl: 'views/dynamic-form.html'
        };
    };

    dynamicForm.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicForm', dynamicForm);

})();
