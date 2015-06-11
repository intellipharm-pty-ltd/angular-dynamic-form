(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Fieldset Controller
    //----------------------------------

    var DynamicFormFieldsetCtrl = function($scope) {

        /**
         * onBlur
         */
        this.onBlur = function() {
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur();
            }
        };

        /**
         * onChange
         */
        this.onChange = function() {
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange();
            }

            if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
                _.forEach($scope.field.options, function(option) {
                    _.set($scope.model, option.value, _.indexOf($scope.value, option.value) >= 0);
                });
            }

            _.set($scope.model, $scope.field.name, $scope.value);
        };

        //----------------------------------
        // init
        //----------------------------------

        if ($scope.field.format === 'map' && $scope.field.type === 'multi_select') {
            $scope.value = [];

            _.forEach($scope.field.options, function(option) {
                if ($scope.model[option.value]) {
                    $scope.value.push(option.value);
                }
            });

            _.set($scope.model, $scope.field.name, $scope.value);
        }
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
