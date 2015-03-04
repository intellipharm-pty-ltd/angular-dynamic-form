'use strict';

(function() {

    //----------------------------------
    // Dynamic Form Controller
    //----------------------------------

    var DynamicFormCtrl = function($rootScope, $scope, $q, DYNAMIC_FORM_EVENTS, DynamicFormService, Util, StateService) {

        var self = this;

        // control
        this.init_complete      = false;
        this.busy               = true;

        // set by config:
        this.edit_state;
        this.show_edit_button;
        this.show_submit_button;
        this.show_edit_cancel_button;
        this.show_cancel_button;
        this.show_clear_button;

        // data
        this.message        = {};
        this.message_state  = {success: false, error: false};
        this.fields         = []; // this will be used by view
        this.submit_label   = "SAVE";
        this.model_backup   = {}; // for cancel functionality
        $scope.errors         = {}; // this will keep track of errors (built in $errors is associated to the model (which is shared by instances) not the form)

        this.form_config = {};
        this.form_config_defaults = {
            is_edit_state:              true,
            has_groups:                 false,
            show_edit_button:           false,
            show_submit_button:         true,
            show_edit_cancel_button:    false,
            show_cancel_button:         false,
            show_clear_button:          false,
            has_required_indicator:     true,
            has_validation_feedback:    true,
            has_help_messages:          false,
            label_replace_underscores:  true,
            label_camelcase:            false,
            show_labels:                true,
            validate:                   true,
            has_messages:               true,
            process:                    true,
            scroll_message:             true,
            validate_fields_exclude:    []
            //validate_fields:          [],
        };
        this.fields_config = {};
        this.fields_config_defaults = {};
        this.groups_config = {};
        this.groups_config_defaults = {};


        /**
         * init
         * called when model is ready
         */
        this.init = function() {

            //----------------------------------
            // init
            //----------------------------------

            // only initialise once
            if (!this.init_complete) {
                this.init_complete = true; // set init complete

                // reset
                this.fields = [];

                // defaults
                this.form_config = _.clone(this.form_config_defaults);
                this.fields_config = _.clone(this.fields_config_defaults);
                this.groups_config = _.clone(this.groups_config_defaults);

                // extend configs
                angular.extend(this.form_config, $scope.config);

                // form config
                if (!_.isUndefined(this.form_config)) {
                    this.edit_state                 = this.form_config.is_edit_state;
                    this.has_groups                 = this.form_config.has_groups;
                    this.show_edit_button           = this.form_config.show_edit_button;
                    this.show_submit_button         = this.form_config.show_submit_button;
                    this.show_edit_cancel_button    = this.form_config.show_edit_cancel_button;
                    this.show_cancel_button         = this.form_config.show_cancel_button;
                    this.show_clear_button          = this.form_config.show_clear_button;
                    this.show_labels                = this.form_config.show_labels;
                    this.has_required_indicator     = this.has_required_indicator;
                    this.has_validation_feedback    = this.has_validation_feedback;
                    this.has_help_messages          = this.has_help_messages;
                    this.label_replace_underscores  = this.label_replace_underscores;
                    this.label_camelcase            = this.label_camelcase;
                    this.validate                   = this.validate;
                    this.has_messages               = this.has_messages;
                    this.process                    = this.process;
                    this.validate_fields_exclude    = this.validate_fields_exclude;
                    this.scroll_message             = this.scroll_message;

                    if (_.has(this.form_config, 'submit_label')) {
                        this.submit_label = this.form_config.submit_label;
                    }
                }

                //--------------------------------------
                // fields config
                //--------------------------------------

                var _field_config = {};

                // directive field config attr
                if (_.has($scope, 'field_config')) {
                    angular.extend(_field_config, $scope.field_config);
                }

                // exclude all except specified

                if (_.has(_field_config, 'exclude_except')) {
                    var obj = {};

                    // exclude all
                    _.forEach($scope.model, function(item, key) {
                        obj[key] = {};
                        angular.extend(obj[key], _field_config[key]);
                        obj[key].exclude = true;
                    });

                    // allow exceptions
                    _.forEach(_field_config.exclude_except, function(item) {
                        obj[item].exclude = false;
                    });

                    angular.extend(this.fields_config, obj);
                }

                // exclude specified

                else if (!_.isEmpty(_field_config)) {
                    angular.extend(this.fields_config, _field_config);
                }

                //----------------------------------------
                // fields
                //----------------------------------------

                // create fields array

                _.forEach(this.fields_config, function(item, key) {

                    var excluded = _.has(item, 'exclude') ? item.exclude : false;

                    // if not excluded
                    if (!excluded) {

                        // add to model if a non-model field
                        if (!_.has($scope.model, key)) {
                            $scope.model[key] = "";
                        }

                        var field = {
                            name:       key,
                            label:      key,
                            model:      $scope.model[key],
                            validate:   false,
                            type:       'text'
                        };

                        // form config
                        if (!_.isUndefined(this.form_config)) {

                            // label replace underscores
                            if (_.has(this.form_config, 'label_replace_underscores') && this.form_config.label_replace_underscores === true) {
                                field.label = field.label.replace(/\_/g, " ");
                            }
                            // label camelcase
                            if (_.has(this.form_config, 'label_camelcase') && this.form_config.label_camelcase === true) {
                                field.label = labelCamelCase(field.label);
                            }
                        }

                        // fields config
                        if (!_.isUndefined(this.fields_config) && _.has(this.fields_config, key)) {
                            angular.extend(field, this.fields_config[key]);
                        }

                        this.fields.push(field);
                    }
                }, this);

                //--------------------------------------
                // groups config
                //--------------------------------------

                var _groups_config = {};

                // directive groups config attr
                if (_.has($scope, 'groups_config')) {
                    angular.extend(_groups_config, $scope.groups_config);
                }

                angular.extend(this.groups_config, _groups_config);

                // if groups config set
                if (!_.isEmpty(this.groups_config)) {

                    // add group to each field
                    _.forEach(this.fields, function(field) {
                        var group_order = 1;

                        _.forEach(this.groups_config, function(group) {

                            _.forEach(group.fields, function(group_field, index) {
                                if (group_field === field.name) {
                                    field.group_label = group.label;
                                    if (_.has(group, 'order')) {
                                        group_order = group.order;
                                    }
                                    field.group_order = group_order;
                                    field.order = index;
                                }
                            }, this);
                            group_order++;
                        }, this);
                    }, this);

                    // sort (by group_order)
                    this.fields = _.sortBy(this.fields, 'order');

                    // set form_config
                    this.form_config.has_groups = true;
                }

                //--------------------------------------
                // copy data for display
                //--------------------------------------

                //$scope.model_copy = this.transformDataBeforeDisplay($scope.model, this.fields_config);
                this.transformDataBeforeDisplay($scope.model, this.fields_config);
            }

            this.busy = false;
        };

        /**
         * onEdit
         */
        this.onEdit = function() {

            // save original data if not already saved (for edit cancel functionality)
            if (_.isEmpty(this.active_record_backup)) {
                backupModelData.call(this, this.active_record_backup, $scope.model);
            }

            // set edit state
            this.edit_state = true;
        };

        /**
         * onEditCancel
         */
        this.onEditCancel = function() {

            // restore original data (if saved)
            if (!_.isEmpty(this.active_record_backup)) {
                restoreModelData.call(this, this.active_record_backup, $scope.model);
            }

            // set edit state
            this.edit_state = false;
        };

        /**
         * setMessage
         */
        this.setMessage = function(type, response_message) {

            var default_messages = {
                valid:      "",
                invalid:    "Please complete all required fields",
                success:    "Form successfully submitted",
                error:      "There was an error submitting form"
            };

            // invalid type
            if (!_.has(default_messages, type)) {
                return "";
            }

            // keys
            var form_config_key = 'message_' + type;
            var message_key = type === 'success' || type === 'valid' ? 'success' : 'error';

            // get message from form_config
            if (_.has(self.form_config, form_config_key)) {
                self.message[message_key] = self.form_config[form_config_key];
            }

            // use response message
            else if (!_.isUndefined(response_message)) {
                self.message[message_key] = response_message;
            }

            // default message
            else if (!_.isEmpty(default_messages[type])) {
                self.message[message_key] = default_messages[type];
            }

            // no message
            else {
                self.message_state.error = false;
                self.message_state.success = false;
                return;
            }

            // show message
            if (message_key === 'error') {
                self.message_state.error = true;
                self.message_state.success = false;
            } else {
                self.message_state.error = false;
                self.message_state.success = true;
            }

            StateService.set('message', self.message);
            StateService.set('message_state', self.message_state);
        };

        /**
         * validateForm
         * @returns promise
         */
        this.validateForm = function() {
            return $q(function(resolve, reject) {

                self.message_state.error    = false;
                self.message_state.success  = false;
                self.message.error          = null;
                self.message.success        = null;

                // check if we should validate
                if (!self.form_config.validate) {
                    resolve();
                    return;
                }

                // validation fields by inclusion (white list)
                if (!_.has(self.form_config, 'validate_fields')) {
                    self.form_config.validate_fields = [];
                }

                // validation fields by exclusion (black list)
                if (_.has(self.form_config, 'validate_fields_exclude')) {
                    _.forEach($scope.model, function (item, key, obj) {
                        if (!_.include(self.form_config.validate_fields_exclude, key) && !_.include(self.form_config.validate_fields, key)) {
                            self.form_config.validate_fields.push(key);
                        }
                    });
                }

                $scope.model.validate(self.form_config.validate_fields).then(
                    function(response) {

                        self.result = response.message;

                        if (response.message !== 'valid') {

                            // message
                            if (_.has(self.form_config, 'message_invalid')) {
                                self.message_state.error = true;
                                self.message.error = self.form_config.message_invalid;
                            }

                            reject(response);
                            return;
                        }

                        // message
                        if (_.has(self.form_config, 'message_valid')) {
                            self.message_state.success = true;
                            self.message.success = self.form_config.message_valid;
                        }

                        // reset errors
                        $scope.errors = {};

                        resolve(response);
                    },
                    function(response) {

                        self.result = response.message;

                        // message
                        if (_.has(self.form_config, 'message_invalid')) {
                            self.message_state.error = true;
                            self.message.error = self.form_config.message_invalid;
                        }

                        $scope.errors = response.data;
                        reject(response.data);
                    }
                );
            });
        };

        /**
         * processForm
         *
         * @returns {*}
         */
        this.processForm = function () {
            // custom preSubmit function
            if (!_.isUndefined($scope.preSubmit)) {
                if ($scope.preSubmit() === false) {
                    return $q(function(resolve, reject) {
                        reject();
                    });
                }
            }

            return this.saveForm();
        };

        this.saveForm = function() {
            // custom onSubmit function
            if (!_.isUndefined($scope.onSubmit)) {
                return $scope.onSubmit();
            }

            return $q(function(resolve, reject) {

                $scope.model.save().then(
                    function (response) {
                        var message = _.has(response, 'data') ? response.data.message : undefined;
                        resolve(message);
                    },
                    function (response) {
                        var message = _.has(response, 'data') ? response.data.message : undefined;
                        reject(message);
                    }
                );
            });
        }

        /**
         * transformDataBeforeDisplay
         *
         * @param model
         * @param fields_config
         */
        this.transformDataBeforeDisplay = function(model, fields_config) {

            //var model = model;//_.clone(model);

            _.forEach(fields_config, function(item, key) {

                if (_.has(item, 'type') && _.has(model, key) && !_.isNull(model[key])) {

                    if (item.type === 'datepicker') {
                        model[key] = Util.formatDateForDisplay(model[key]);
                    }

                    if (item.type === 'time') {
                        model[key] = Util.formatTimeForDisplay(model[key]);
                    }

                    if (item.type === 'multi-select' && _.has(item, 'format') && item.format === 'map') {
                        model[key] = Util.formatMultiSelectForDisplay(item, model);
                    }
                }
            });

            //return result;
        };

        /**
         * transformDataBeforeSubmit
         *
         * @param model
         * @param fields_config
         */
        this.transformDataBeforeSubmit = function(model, fields_config) {

            // format fields
            _.forEach(fields_config, function(item, key) {


                if (_.has(item, 'type') && _.has(model, key) && !_.isNull(model[key])) {

                    if (item.type === 'datepicker') {
                        model[key] = Util.formatDateForMySQL(model[key]);
                    }

                    /*if (item.type === 'time') {
                        model[key] = Util.formatTimeForMySQL(model[key]);
                    }*/

                    if (item.type === 'multi-select' && _.has(item, 'format') && item.format === 'map') {
                        Util.formatMultiSelectForMySQL(item, model, key);
                    }

                    if (item.type === 'currency') {
                        model[key] = Util.formatDecimalForMySQL(model[key]);
                    }
                }

                // set undefined values to empty string if in validation array
                if (_.includes(self.form_config.validate_fields, key) && _.isUndefined(model[key])) {
                    model[key] = "";
                }/*
                if (_.includes(self.form_config.validate_fields, key) && model[key] === "") {
                    model[key] = 0;
                }*/
            });
        };

        /**
         * onSubmit
         */
        this.onSubmit = function () {

            $scope.submited = true;

            this.busy = true; // disable form

            // transform data
            this.transformDataBeforeSubmit($scope.model, this.fields_config);

            // validate form
            this.validateForm().then(

                // valid
                function(response) {
                    $scope.model.scope_id = $scope.$id;
                    $scope.validated = true;

                    self.setMessage('valid');
                    $scope.$emit(DYNAMIC_FORM_EVENTS.valid, $scope.model);

                    // check if we should process
                    if (_.has(self.form_config, 'process') && !self.form_config.process) {
                        return;
                    }

                    // process form
                    self.processForm().then(self.onSubmitSuccess, self.onSubmitError);
                },

                // invalid
                function(response) {
                    console.log(response);
                    response.scope_id = $scope.$id;
                    self.setMessage('invalid');
                    $scope.$emit(DYNAMIC_FORM_EVENTS.invalid, response);
                    self.busy = false;
                }
            );
        };

        this.onSubmitSuccess = function(message) {
            $scope.processed = true;

            self.setMessage('success', message);
            $rootScope.$broadcast(DYNAMIC_FORM_EVENTS.processSuccess, message);

            // format data
            self.transformDataBeforeDisplay($scope.model, self.fields_config);

            self.busy = false;
        };

        this.onSubmitError = function(message) {
            self.setMessage('error', message);
            $rootScope.$broadcast(DYNAMIC_FORM_EVENTS.processError, message);
            self.busy = false;
        };

        /**
         * onClear
         */
        this.onClear = function() {

            // clear model data
            _.forEach($scope.model, function (item, key) {

                var excluded = (!_.isUndefined(this.fields_config) && _.has(this.fields_config, key) && _.has(this.fields_config[key], 'exclude') && this.fields_config[key].exclude === true);

                // if not in ignore list AND not excluded in fields config
                if (!_.contains(this.fields_ignore, key) && !excluded) {
                    $scope.model[key] = ""; // clear field
                }
            }, this);
        };

        /**
         * onCancel
         */
        this.onCancel = function() {

            if (!_.isUndefined($scope.onCancel)) {
                $scope.onCancel();
            }
        };


        /////////////////////////////////////////////////////////////////////
        //
        // Events
        //
        /////////////////////////////////////////////////////////////////////

        //-----------------------------------
        // submit (force submit)
        //-----------------------------------

        $scope.$on(DYNAMIC_FORM_EVENTS.submit, function(evt, params) {

            if (_.has(params, 'model') && params.model !== $scope.model.model) {
                return;
            }

            if ($scope.is_active == true) {
                $scope.submitted = true;
                self.onSubmit();
            } else {
                $scope.submitted = false;
            }
        });

        $scope.$on(DYNAMIC_FORM_EVENTS.forceSubmit, function(evt, params) {
            if (_.has(params, 'model') && params !== $scope.model) {
                return;
            }

            if ($scope.is_active == true) {
                $scope.submitted = true;
                self.saveForm().then(self.onSubmitSuccess, self.onSubmitError);
            } else {
                $scope.submitted = false;
            }
        });


        //-----------------------------------
        // model
        //-----------------------------------

        $scope.$watch('model', function(model) {

            if (!_.isUndefined(model)) {
                self.init();
            }
        });

    };

    DynamicFormCtrl.$inject = ['$rootScope', '$scope', '$q', 'DYNAMIC_FORM_EVENTS', 'DynamicFormService', 'DynamicFormUtilLib', 'DynamicFormStateService'];


    //-----------------------------------
    // backupModelData
    //-----------------------------------

    function backupModelData(backup, model, ignore_list) {
        _.forEach(model, function (value, key) {
            if (!_.contains(ignore_list, key)) {
                backup[key] = value;
            }
        });
    }

    //-----------------------------------
    // restoreModelData
    //-----------------------------------

    function restoreModelData(backup, model) {
        _.forEach(backup, function (value, key) {
            model[key] = value;
        });
    }

    //-----------------------------------
    // labelCamelCase
    // converts space or underscore seperated text to camelCase
    //-----------------------------------

    function labelCamelCase(input) {
        var result = input.replace(/\_/g, " ");
        result = _.map(result.split(" "), function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
        return result.join(" ");
    }

    angular.module('AngularDynamicForm')
        .controller('DynamicFormCtrl', DynamicFormCtrl);
})();
