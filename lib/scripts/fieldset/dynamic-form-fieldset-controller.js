'use strict';

(function() {

        //----------------------------------
        // Dynamic Form Fieldset Controller
        //----------------------------------

    var DynamicFormFieldsetCtrl = function($scope ,$timeout, DynamicFormService) {

        var self = this;

        $scope.search_query = "";
        this.search_result;
        this.selected_product;
        this.new_pin = $scope.model[$scope.field.name] ? '* * * *' : '';

        this.google_place = $scope.model.google_place;

        //----------------------------------
        // Datepicker
        //----------------------------------

        $scope.datepicker_format = 'dd-MM-yyyy';

        //----------------------------------
        // Timepicker
        //----------------------------------

        //----------------------------------
        // onChange
        //----------------------------------

        this.onChange = function(model, default_val) {
            if (_.isUndefined(default_val) && _.isUndefined(model)) {
                model = default_val;
            }

            // if field is required
            if ($scope.field.validate) {
                $scope.errors = DynamicFormService.validateField($scope.model, $scope.field.name); // validate field
                $scope.show_validation = true; // show validation
            }
        };

        //----------------------------------
        // onBlur
        //----------------------------------

        this.onBlur = function() {

            // if field is required
            if ($scope.field.validate) {
                $scope.errors = DynamicFormService.validateField($scope.model, $scope.field.name); // validate field
                $scope.show_validation = true; // show validation
            }
        };

        //-----------------------------------
        // arrayContains
        //-----------------------------------

        this.arrayContains = function(arr, value, key) {
            if (!_.isUndefined(key)) {
                var result = false;
                _.forEach(arr, function(item) {
                    if (item[key] === value) {
                        result = true;
                        //return false;
                    }
                });
                return result;
            } else {
                return _.contains(arr, value);
            }
        };

        //-----------------------
        // onGooglePlaceToggle
        //-----------------------
        this.onGooglePlaceToggle = function() {
            this.google_place_manual = !this.google_place_manual;

            // if entering manually then clear the google place
            if (this.google_place_manual) {
                $scope.model.google_place = '';
            }
        };

        //-----------------------
        // onGooglePlaceClick
        //-----------------------
        this.onGooglePlaceClick = function() {
            this.google_place = null;
        };

        //-----------------------
        // on Google Place Select
        //-----------------------

        this.onGooglePlaceSelect = function(data) {
            $scope.model.google_place = data.place_id;
            $scope.field.query = data.formatted;
            this.google_place = data;
        };

        //-----------------------
        // on Model Search Select Select
        //-----------------------

        this.onModelSearchSelectSelect = function(data) {
            var self = this;

            if (_.has(data, 'id') && !_.isUndefined(data.id)) {

                $scope.field.model.view(_.parseInt(data.id)).then(function(response) {

                    if (!_.isArray($scope.model[$scope.field.name])) {
                        $scope.model[$scope.field.name] = [];
                    }

                    if (!_.includes(_.pluck($scope.model[$scope.field.name], 'id'), response.data.id)) {
                        $scope.model[$scope.field.name].push(response.data);
                    }
                });
            }
        };

        //----------------------------------
        // generateNewPin
        //----------------------------------

        this.generateNewPin = function(field, model) {
            model.model.api('generateNewPin').then(function(response) {
                model[field] = response.data.data;
                self.new_pin = response.data.data;
                self.new_pin_generated = true;
            });
        };
    };

    DynamicFormFieldsetCtrl.$inject = ['$scope', '$timeout', 'DynamicFormService'];

    angular.module('AngularDynamicForm').controller('DynamicFormFieldsetCtrl', DynamicFormFieldsetCtrl);
})();
