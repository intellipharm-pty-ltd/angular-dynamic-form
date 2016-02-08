(function() {
    'use strict';

    var dynamicFormFieldset = function($templateCache, AngularDynamicFormCustomInputViewUrl) {
        return {
            restrict: 'E',
            scope: {
                field:              '=?',
                model:              '=?',
                allErrors:          '=?',
                config:             '=?',
                style_config:       '=styleConfig',
                onKeypress:         '&?',
                onChange:           '&?',
                onBlur:             '&?',
                show_validation:    '=showValidation'
            },
            controller: 'DynamicFormFieldsetCtrl as DynamicFormFieldset',
            replace: true,
            link: function(scope) {

                scope.errors = [];

                // set input view template
                scope.input_view_template = 'angular-dynamic-form/views/inputs/' + scope.field.type + '.html';

                if (_.isUndefined($templateCache.get(scope.input_view_template))) {
                    scope.input_view_template = AngularDynamicFormCustomInputViewUrl + scope.field.type + '.html';
                }

                // watchers
                scope.$watchCollection('model', function() {
                    if (!_.isUndefined(scope.model)) {
                        scope.value = _.get(scope.model, scope.field.name);
                    }
                });

                scope.$watchCollection('allErrors', function() {
                    if (!_.isUndefined(scope.allErrors) && _.has(scope.allErrors, scope.field.name)) {

                        scope.errors = _.get(scope.allErrors, scope.field.name);
                        updateFieldsetClass();
                        updateValidationFeedbackClass();
                    }
                });

                scope.$watchCollection('config', function() {
                    if (!_.isUndefined(scope.style_config)) {
                        updateFieldsetClass();
                        updateValidationFeedbackClass();
                    }
                });

                scope.$watchCollection('style_config', function() {
                    if (!_.isUndefined(scope.style_config)) {
                        updateFieldsetClass();
                        updateValidationFeedbackClass();
                    }
                });

                function updateFieldsetClass() {
                    var classes = [scope.style_config.fieldset_class];

                    if (scope.config.has_validation_feedback) {
                        if (scope.errors) {
                            classes.push(scope.style_config.fieldset_feedback_class);

                            if (scope.errors.length === 0) {
                                classes.push(scope.style_config.fieldset_no_errors_class);
                            } else {
                                classes.push(scope.style_config.fieldset_errors_class);
                            }
                        }
                    }

                    if (scope.field.validate) {
                        classes.push(scope.style_config.fieldset_required_class);
                    }

                    scope.fieldset_class = classes.join(' ');
                }

                function updateValidationFeedbackClass() {
                    var classes = [scope.style_config.validation_feedback_class];

                    if (scope.errors) {
                        if (scope.errors.length === 0) {
                            classes.push(scope.style_config.validation_no_errors_class);
                        } else {
                            classes.push(scope.style_config.validation_errors_class);
                        }
                    }

                    scope.validation_feedback_class = classes.join(' ');
                }
            },
            templateUrl: 'angular-dynamic-form/views/dynamic-form-fieldset.html'
        };
    };

    dynamicFormFieldset.$inject = ['$templateCache', 'AngularDynamicFormCustomInputViewUrl'];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
