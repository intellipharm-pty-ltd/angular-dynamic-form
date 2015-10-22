(function() {
    'use strict';

    //----------------------------------
    // Dynamic Form Controller
    //----------------------------------

    var DynamicFormCtrl = function($rootScope, $scope, $q, $location, DYNAMIC_FORM_EVENTS, FieldTransformer, ConfigTransformer, SubmitService) {

        var self = this;
        var api = $scope.api || {};

        // control
        $scope.is_submitting = $scope.form_config.auto_submit;
        $scope.submit_step = null;
        $scope.show_buttons = $scope.is_submitting;
        $scope.has_submitted = false;

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

            // clear errors
            if (_.has($scope.errors, field.name)) {
                $scope.errors[field.name] = [];
            }

            // custom blur handler
            if (!_.isUndefined($scope.onBlur)) {
                $scope.onBlur({model: $scope.model, field: field});
            }
        };

        /**
         * onFieldChange
         */
        this.onFieldChange = function(field) {

            // clear errors
            if (_.has($scope.errors, field.name)) {
                $scope.errors[field.name] = [];
            }

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
                    $scope.has_submitted = true;

                    // custom complete handler
                    if (!_.isUndefined($scope.onSubmitComplete)) {
                        $scope.onSubmitComplete(response);
                    }
                    $scope.is_submitting = false;
                },

                // error
                function(response) {
                    $scope.has_submitted = true;

                    // custom error handler
                    if (!_.isUndefined($scope.onError)) {
                        $scope.onError(response);
                    }
                },

                // updates (messaging)
                function(response) {
                    $scope.has_submitted = true;

                    // set errors
                    if (response.message_state === 'error') {
                        $scope.errors = response.data;
                    }
                    // reset errors
                    else {
                        _.forEach($scope.errors, function(error, key) {
                            $scope.errors[key] = [];
                        });
                    }

                    // show message
                    if (!_.isUndefined(response.message)) {
                        self.showMessage(response.message_state, response.message);
                    }

                    // emit event (if recognised step)
                    switch (response.step) {

                        case 'validate':

                            // custom after validate handler
                            if (!_.isUndefined($scope.onAfterValidate)) {
                                $scope.onAfterValidate({response: response});
                            }

                            // broadcast events
                            if (response.message_state === 'success') {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.valid, response);
                            } else {
                                $scope.$emit(DYNAMIC_FORM_EVENTS.invalid, response);
                            }
                            break;

                        case 'save':

                            // custom after save handler
                            if (!_.isUndefined($scope.onAfterSave)) {
                                $scope.onAfterSave({response: response});
                            }

                            // broadcast events
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
         * called when model is ready (if $s.auto_init is not set to false)
         */
        this.init = function( refresh_scope ) {

            if ( _.isUndefined( refresh_scope ) ) {
                refresh_scope = false;
            }

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

            if ($scope.form_config.populate_model_from_url_parameters) {
                var query_parameters = $location.search();

                _.forEach($scope.fields_array, function(field) {
                    if (_.has(query_parameters, field.name)) {
                        _.set($scope.model, field.name, query_parameters[field.name]);
                    }
                });
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

            // external handler
            if (!_.isUndefined($scope.onInit)) {
                $scope.onInit();
            }

            is_initialized = true;

            if ( refresh_scope ) {
                $scope.$apply();
            }
        };

        /**
         * update
         * called when fields property changes
         */
        this.update = function() {

            if (_.isNull($scope.model)) {
                return true;
            }

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
        // model
        //-----------------------------------

        var initialized = $scope.$watch('model', function(val) {

            if (!_.isUndefined(val) && val && $scope.auto_init !== false) {

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

        //--------------------------------------------------------
        // events
        //--------------------------------------------------------

        //-----------------------------------
        // submit (force submit)
        // TODO: remove when removed from Loyalty project
        //-----------------------------------

        $scope.$on(DYNAMIC_FORM_EVENTS.submit, function(evt, params) {

            if (_.has(params, 'model') && params.model !== $scope.model.model) {
                return;
            }

            self.onSubmit();
        });

        /////////////////////////////////////////////////////
        //
        // public API
        //
        /////////////////////////////////////////////////////

        /**
         * init
         */
        api.init =  function() {
            self.init( true );
            initialized(); // destroy watcher
        };

        /**
         * submit
         */
        api.submit =  function() {
            self.onSubmit();
        };

        /**
         * set_property
         */
        api.set_property =  function( property, value ) {
            $scope[ property ] = value;
        };
    };

    DynamicFormCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        '$location',
        'DYNAMIC_FORM_EVENTS',
        'AngularDynamicForm.transformers.FieldTransformer',
        'AngularDynamicForm.transformers.ConfigTransformer',
        'AngularDynamicForm.helpers.SubmitService'
    ];

    angular.module('AngularDynamicForm')
        .controller('DynamicFormCtrl', DynamicFormCtrl);
})();
