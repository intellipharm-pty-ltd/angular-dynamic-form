'use strict';

(function() {

    //----------------------------------
    // Angular Dynamic Form
    //----------------------------------

    angular.module('AngularDynamicForm', [
        'angular.filter'
    ]);

    angular.module('AngularDynamicForm').run(["$templateCache", function($templateCache) {
        $templateCache.put("views/dynamic-form.html",
            "<h1>DF</h1>"
        );
    }]);
})();

"use strict";

(function () {

	//-------------------------
	// State Service
	//-------------------------

	var StateService = function() {

		this.repo = {};

		/**
		 * set
		 *
		 * @param name
		 * @param value
		 */
		this.set = function(name, value) {
			this.repo[name] = value;
		};

		/**
		 * get
		 *
		 * @param name
		 * @param default_value
		 * @returns {*}
		 */
		this.get = function(name, default_value, delete_after) {

			// no record in repository

			if (!_.has(this.repo, name) && !_.isUndefined(default_value)) {
				return default_value;
			}

			if (!_.has(this.repo, name)) {
				return null;
			}

			// get record from repository

			var result = this.repo[name];

			// delete ?

			if (delete_after) {
				delete this.repo[name];
			}

			return result;
		};

		/**
		 * remove
		 *
		 * @param name
		 * @returns {*}
		 */
		this.remove = function(name) {
			delete this.repo[name];
		};

	};

	angular.module('AngularDynamicForm').service('DynamicFormStateService', StateService);

})();
'use strict';

(function() {

    //-------------------------
    // Util Library
    //-------------------------

    var Util = function() {

        this.format = {
            date: {
                display: 'DD-MM-YYYY',
                mysql: 'YYYY-MM-DD'
            },
            time: {
                display: 'HH:mm:SS',
                mysql: 'HH:mm:SS'
            }
        };

        //-------------------------------
        // slugify
        //
        // replace_camels
        //   ThisIs ATest = this-is-a-test
        //
        // !replace_camels
        //   ThisIs ATest = thisis-atest
        //-------------------------------

        this.slugify = function(str, replace_camels, seperator) {

            if (_.isUndefined(seperator)) {
                seperator = "-";
            }
            if (_.isString(str)) {

                if (replace_camels) {
                    str = str.replace(/^[A-Z]/, function (match) { // Lowercase First
                        return match.toLowerCase();
                    });
                    str = str.replace(/[A-Z]/g, function (match) { // Replace additional Uppercase with - then Lowercase
                        return seperator + match.toLowerCase();
                    });
                } else {
                    str = str.toLowerCase(); // Lowercase All
                }
                str = str.replace(/\s+/g, seperator); // Replace spaces with seperator
                str = str.replace(/\.+/g, seperator); // Replace dots with seperator
            } else {
                str = "";
            }

            if (seperator === '-') {
                str = str.replace(/(\-{2})/g, seperator); // Replace double dashes with singles
            }
            if (seperator === '_') {
                str = str.replace(/(\_{2})/g, seperator); // Replace double underscores with singles
            }

            return str;
        };

        //-------------------------------
        // deslugify
        //-------------------------------

        this.deslugify = function(str) {
            return str
                .toLowerCase()
                .replace(/[\.\-]+/g, ' ')
                .replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                })
                .replace(/\s+/g, '');
        };

        /**
         * formatDateForDisplay
         *
         * @param date
         * @returns {*}
         */
        this.formatDateForDisplay = function(date) {
            var m;

            if (_.isUndefined(date) || _.isNull(date)) {
                return undefined;
            }

            if (_.isString(date)) {
                m = moment(date, this.format.date.mysql);

                if (!m.isValid()) {
                    m = moment(date, this.format.date.display);
                }
            } else {
                m = moment(date);
            }

            return m.format(this.format.date.display);
        };

        /**
         * formatDateForMySQL
         *
         * @param date
         * @returns {*}
         */
        this.formatDateForMySQL = function(date) {
            var m;

            if (_.isUndefined(date) || _.isNull(date)) {
                return undefined;
            }

            if (_.isString(date)) {
                m = moment(date, this.format.date.display);

                if (!m.isValid()) {
                    m = moment(date, this.format.date.mysql);
                }
            } else {
                m = moment(date);
            }

            return m.format(this.format.date.mysql);
        };

        /**
         * formatTimeForDisplay
         *
         * @param time
         * @returns {*}
         */
        this.formatTimeForDisplay = function(time) {
            var m;

            if (_.isUndefined(time) || _.isNull(time)) {
                return undefined;
            }

            if (_.isString(time)) {
                m = moment(time, this.format.time.mysql);

                if (!m.isValid()) {
                    m = moment(time, this.format.time.display);
                }
            } else {
                m = moment(time);
            }

            return m.format(this.format.time.display);
        };

        /**
         * formatTimeForMySQL
         *
         * @param date
         * @returns {*}
         */
        this.formatTimeForMySQL = function(time) {
            var m;

            if (_.isUndefined(time) || _.isNull(time)) {
                return undefined;
            }

            if (_.isString(time)) {
                m = moment(time, this.format.time.display);

                if (!m.isValid()) {
                    m = moment(time, this.format.time.mysql);
                }
            } else {
                m = moment(time);
            }

            return m.format(this.format.time.mysql);
        };

        /**
         * formatMultiSelectForDisplay
         *
         * @param item
         * @param model
         * @returns {Array}
         */
        this.formatMultiSelectForDisplay = function(item, model) {
            var result = [];
            _.forEach(item.options, function (option) {
                if (_.has(model, option.value) && model[option.value] === true) {
                    result.push(option.value);
                }
            });
            return result;
        };

        /**
         * formatMultiSelectForMySQL
         *
         * @param item
         * @param model
         * @param key
         */
        this.formatMultiSelectForMySQL = function(item, model, key) {
            _.forEach(item.options, function (option) {
                if (_.has(model, option.value)) {
                    model[option.value] = _.includes(model[key], option.value) ? true : false;
                }
            });
            delete model[key];
        };

        /**
         * formatDecimalForMySQL
         *
         * @param data
         */
        this.formatDecimalForMySQL = function(data) {
            if (_.isUndefined(data)) {
                return undefined;
            }
            return parseFloat(data).toFixed(2);
        };
    };

    angular.module('AngularDynamicForm').constant('DynamicFormUtilLib', new Util());
})();

'use strict';

(function() {

	//----------------------------------
	// DynamicForm Settings
	//----------------------------------

	angular.module('AngularDynamicForm')
		.constant('DYNAMIC_FORM_EVENTS', {
			init:           "dynamic-form:init",
			valid:          "dynamic-form:valid",
			invalid:        "dynamic-form:invalid",
			processSuccess: "dynamic-form:process-success",
			processError:   "dynamic-form:process-error",
			submit:         "dynamic-form:submit",
            forceSubmit:    "dynamic-form:force-submit",
			validate:       "dynamic-form:validate"
		});
})();

"use strict";

(function() {


	// TODO: remove once done, no longer using

    var DynamicFormService = function() {

		var self = this;

		//------------------------------
		// validateAllFields
		// @return errors array
		//------------------------------

		this.validateAllFields = function(model, validation_rules) {

			var are_all_valid = true;
			var errors = {};
			var _validation_rules = {};

			// model validation rules
			if (_.has(model, 'validation_rules') && !_.isEmpty(model.validation_rules)) {
				 angular.extend(_validation_rules, model.validation_rules);
			}

			// validation rules param
			if (!_.isEmpty(validation_rules)) {
				angular.extend(_validation_rules, validation_rules);
			}

			// validation is present
			if (!_.isUndefined(_validation_rules)) {

				_.forEach(model, function (item, key) {

					// only validate required fields
					if (_.has(_validation_rules, key)) {

						if (_.has(_validation_rules[key], 'presence') && !_validation_rules[key].presence) {
							// don't validate
						} else {
							// validate field
							errors[key] = self.validateField(model, key);
							if (errors[key].length > 0) {
								are_all_valid = false;
							}
						}
					}
				});
			}
			return {errors: errors, is_valid: are_all_valid};
		};

		//------------------------------
		// validateField
		// @return errors
		//------------------------------

		this.validateField = function(model, key) {
			var errors = [];
			model.clearErrors(); // clear errors (so that we know the errors we retrieve after validation are for this instance)
			var result = model.validate(key); // validate field

			if (!result) { // only add errors if validation failed
				errors = model.$errors[key];
			}
			return errors;
		};
    };

    angular.module('AngularDynamicForm')
        .service('DynamicFormService', DynamicFormService);

})();

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

"use strict";

(function() {

    var DynamicFormFieldsetService = function() {

		//------------------------------
		// formatDecimal
		//------------------------------

		this.formatDecimal = function(value, regex_remove) {
			if (!_.isUndefined(value)) {
				value = value.replace(regex_remove, '');
			}
			return parseFloat(value).toFixed(2);
		};
    };

    angular.module('AngularDynamicForm')
        .service('DynamicFormFieldsetService', DynamicFormFieldsetService);

})();

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

"use strict";

(function() {

    var dynamicFormFieldset = function() {
        return {
            restrict: 'E',
            scope: {
                field: 						"=",
                model: 						"=",
                errors: 					"=",
                show_validation: 			"=showValidation",
                edit_state: 				"=editState",
                has_validation_feedback: 	"=hasValidationFeedback",
                has_required_indicator: 	"=hasRequiredIndicator",
                has_help_messages: 			"=hasHelpMessages",
				show_label: 				"=showLabel",
				horizontal: 				"="
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
			link: function(scope, element, attrs, ctrl) {

				element.addClass('dynamic-form-fieldset');
			},
            templateUrl: 'views/dynamic-form-fieldset.html?v='+Math.random()
        };
    };

	dynamicFormFieldset.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
