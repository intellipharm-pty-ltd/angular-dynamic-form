(function() {
    'use strict';

        //----------------------------------
        // Dynamic Form Fieldset Controller
        //----------------------------------

    var DynamicFormFieldsetCtrl = function($scope) {

        /**
         * onChange
         */
        this.onChange = function() {

            // custom change handler
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange();
            }
        };

        /**
         * onBlur
         */
        this.onBlur = function() {

            // custom change handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur();
            }
        };
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
