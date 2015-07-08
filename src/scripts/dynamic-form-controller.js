(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Controller
    //----------------------------------

    var DynamicFormCtrl = function($rootScope, $scope, $q, DYNAMIC_FORM_EVENTS, FieldTransformer, ConfigTransformer, SubmitService) {

        var self = this;

        // control
        $scope.is_submitting = $scope.form_config.auto_submit;
        $scope.submit_step = null;
        $scope.show_buttons = $scope.is_submitting;

        var dont_clear_fields = ['model'];
        var is_initialized = false;

        // defaults
        this.default_submit_steps = [
            'validate',
            'save'
        ];

        // messaging
        $scope.message        = {};
        $scope.message_state  = {success: false, error: false};

        /////////////////////////////////////////////////////
        //
        // handlers
        //
        /////////////////////////////////////////////////////

        /**
         * onCancel
         */
        this.onCancel = function() {

            if (!_.isUndefined($scope.onCancel)) {
                $scope.onCancel('');
            }
        };

        /**
         * onClear
         */
        this.onClear = function() {

            // clear model data
            _.forEach($scope.model, function (item, key) {

                // if not in dont_clear_fields
                if (!_.contains(dont_clear_fields, key)) {
                    $scope.model[key] = undefined; // clear field
                }
            }, this);

            if (!_.isUndefined($scope.onClear)) {
                $scope.onClear('');
            }
        };

        /**
         * onFieldBlur
         */
        this.onFieldBlur = function(field) {

            // custom blur handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur({model: $scope.model, field: field});
            }
        };

        /**
         * onFieldChange
         */
        this.onFieldChange = function(field) {

            // custom change handler
            if (!_.isUndefined($scope.onChange)) {
                $scope.onChange({model: $scope.model, field: field});
            }

            // show button on change
            if ($scope.form_config.show_buttons_on_change) {
                $scope.show_buttons = true;
            }
        };

        /**
         * onSubmit
         */
        this.onSubmit = function() {

            // get submit steps
            var submit_steps = !_.isUndefined($scope.submit_steps) ? $scope.submit_steps : this.default_submit_steps;

            $scope.is_submitting = true;

            // call submit service
            SubmitService.handleSubmit(submit_steps, $scope.model, $scope.form_config).then(

                // complete
                function(response) {

                    // custom complete handler
                    if (!_.isUndefined($scope.onSubmitComplete)) {
                        $scope.onSubmitComplete(response);
                    }
                    $scope.is_submitting = false;
                },

                // error
                function(response) {

                    // custom error handler
                    if (!_.isUndefined($scope.onError)) {
                        $scope.onError(response);
                    }
                },

                // updates (messaging)
                function(response) {

                    // set errors
                    $scope.errors = response.data;

                    // show message
                    if (!_.isUndefined(response.message)) {
                        self.showMessage(response.message_state, response.message);
                    }

                    // emit event (if recognised step)
                    switch (response.step) {

                        case 'validate':
                            if (response.message_state === 'success') {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.valid, response);
                            } else {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.invalid, response);
                            }
                            break;

                        case 'save':
                            if (response.message_state === 'success') {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.saveSucccess, response);
                            } else {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.saveError, response);
                            }
                            break;

                    }
                }
            );
        };

        /////////////////////////////////////////////////////
        //
        // init
        //
        /////////////////////////////////////////////////////

        /**
         * init
         * called when model is ready or when init is true
         */
        this.init = function() {

            // transform configs
            $scope.form_config          = ConfigTransformer.transformConfig('form', $scope.form_config);
            $scope.form_style_config    = ConfigTransformer.transformConfig('form_style', $scope.form_style_config);
            $scope.form_field_config    = ConfigTransformer.transformConfig('form_field', $scope.form_field_config);

            // transform fields
            $scope.fields_array         = FieldTransformer.transformFields($scope.fields, $scope.form_config, $scope.model);

            // if groups
            if ($scope.has_groups) {

                // transform group fields
                $scope.grouped_fields_array = FieldTransformer.transformGroupFields($scope.fields_array, $scope.groups_config);
            }

            // auto submit
            if ($scope.form_config.auto_submit) {
                $scope.form_config.auto_submit = false;
                this.onSubmit();
            }

            // show button on change
            if (!$scope.form_config.show_buttons_on_change) {
                $scope.show_buttons = true;
            }

            is_initialized = true;
        };

        /**
         * update
         * called when fields property changes
         */
        this.update = function() {

            // transform fields
            $scope.fields_array = FieldTransformer.transformFields($scope.fields, $scope.form_config, $scope.model);

            // if groups
            if ($scope.has_groups) {

                // transform group fields
                $scope.grouped_fields_array = FieldTransformer.transformGroupFields($scope.fields_array, $scope.groups_config);
            }
        };

        /////////////////////////////////////////////////////
        //
        // messaging
        //
        /////////////////////////////////////////////////////

        /**
         * hideMessage
         */
        this.hideMessage = function() {
            $scope.message = {};
            _.forEach($scope.message_state, function (item) {
                item = false;
            });
        };

        /**
         * showMessage
         *
         * @param type
         * @param message
         */
        this.showMessage = function(type, message) {
            this.hideMessage();
            $scope.message[type] = message;
            $scope.message_state[type] = true;
        };

        /////////////////////////////////////////////////////
        //
        // watchers
        //
        /////////////////////////////////////////////////////

        //-----------------------------------
        // init
        //-----------------------------------

        // we will either use the init or model property trigger initialization
        var watch_for_init = !_.isUndefined($scope.init) ? 'init' : 'model';

        var initialized = $scope.$watch(watch_for_init, function(val) {
            if (!_.isUndefined(val) && val) {
                self.init();
                initialized(); // destroy watcher
            }
        });

        //-----------------------------------
        // fields
        //-----------------------------------

        $scope.$watch('fields', function(val) {
            if (!_.isUndefined(val) && is_initialized) {
                self.update();
            }
        }, true);

        //-----------------------------------
        // groups
        //-----------------------------------

        $scope.$watch('groups_config', function(val) {
            if (!_.isUndefined(val) && is_initialized) {
                self.update();
            }
        }, true);

        /////////////////////////////////////////////////////
        //
        // events
        //
        /////////////////////////////////////////////////////

        //-----------------------------------
        // submit (force submit)
        //-----------------------------------

        $scope.$on(DYNAMIC_FORM_EVENTS.submit, function(evt, params) {

            if (_.has(params, 'model') && params.model !== $scope.model.model) {
                return;
            }

            self.onSubmit();

            //if ($scope.is_active == true) {
            //    $scope.submitted = true;
            //    self.onSubmit();
            //} else {
            //    $scope.submitted = false;
            //}
        });
    };

    DynamicFormCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        'DYNAMIC_FORM_EVENTS',
        'AngularDynamicForm.transformers.FieldTransformer',
        'AngularDynamicForm.transformers.ConfigTransformer',
        'AngularDynamicForm.helpers.SubmitService'
    ];

    angular.module('AngularDynamicForm')
        .controller('DynamicFormCtrl', DynamicFormCtrl);
})();
