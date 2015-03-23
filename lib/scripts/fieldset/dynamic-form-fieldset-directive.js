"use strict";

(function() {

    var dynamicFormFieldset = function($templateCache, AngularDynamicFormCustomInputViewUrl) {
        return {
            restrict: 'E',
            scope: {
                field: 				"=",
                model: 				"=",
                errors: 			"=",
                show_validation: 	"=showValidation",
                config: 	        "=",
                style_config: 	    "=styleConfig",
                onChange:           "&",
                onBlur:             "&"
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
			link: function(scope, element, attrs, ctrl) {

                // add class
				element.addClass('dynamic-form-fieldset');

                // set input view template
                scope.input_view_template = 'angular-dynamic-form/views/inputs/' + scope.field.type + '.html';

                if (_.isUndefined($templateCache.get(scope.input_view_template))) {
                	scope.input_view_template = AngularDynamicFormCustomInputViewUrl + scope.field.type + '.html';
                }
			},
            //templateUrl: '/angular-dynamic-form/lib/views/dynamic-form-fieldset.html'
            templateUrl: 'angular-dynamic-form/views/dynamic-form-fieldset.html'
        };
    };

	dynamicFormFieldset.$inject = ['$templateCache', 'AngularDynamicFormCustomInputViewUrl'];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
