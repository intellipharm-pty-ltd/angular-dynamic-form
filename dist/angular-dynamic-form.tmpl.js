'use strict';

(function() {

    //----------------------------------
    // Angular Dynamic Form
    //----------------------------------

    angular.module('AngularDynamicForm', [
        'angular.filter'
    ]);

    /*angular.module('AngularDynamicForm').run(["$templateCache", function($templateCache) {
        $templateCache.put("views/dynamic-form.html",
            "<h1>DF</h1>"
        );
    }]);*/
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

angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/dynamic-form-fieldset.html',
    "<fieldset class=\"{{style_config.fieldset_class}}\" ng-class=\"{\n" +
    "    'has-feedback': config.has_validation_feedback,\n" +
    "    'has-success': errors.length === 0 && show_validation,\n" +
    "    'has-error': errors.length > 0 && show_validation,\n" +
    "    'required': field.validate}\">\n" +
    "\n" +
    "    <label ng-if=\"field.label !== '' && config.show_labels\" for=\"{{field.name}}\"\n" +
    "           class=\"{{style_config.label_class}}\">{{field.label}}</label>\n" +
    "\n" +
    "    <!-- edit state -->\n" +
    "\n" +
    "    <div class=\"{{style_config.input_box_class}}\">\n" +
    "\n" +
    "\n" +
    "        <div ng-include src=\"input_view_template\"></div>\n" +
    "\n" +
    "        <!-- validation feedback -->\n" +
    "        <span ng-show=\"config.has_validation_feedback\"\n" +
    "              class=\"{{style_config.validation_feedback_class}} glyphicon\"\n" +
    "              ng-class=\"{\n" +
    "              'glyphicon-ok': errors.length === 0 && show_validation,\n" +
    "              'glyphicon-remove': errors.length > 0 && show_validation\n" +
    "              }\"></span>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- indicators -->\n" +
    "    <div ng-show=\"field.required && config.has_required_indicator\" class=\"{{style_config.required_indicator_class}}\">\n" +
    "        <span>*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"errors.length > 0 && show_validation\"\n" +
    "         class=\"{{style_config.message_box_class}}\">{{errors[0]}}</div>\n" +
    "\n" +
    "</fieldset>"
  );


  $templateCache.put('views/dynamic-form-groups.html',
    "<!-- form -->\n" +
    "<form role=\"form\" class=\"form-horizontal\">\n" +
    "\n" +
    "    <!-- form groups -->\n" +
    "    <div ng-if=\"has_groups\"\n" +
    "         class=\"panel panel-default form-section\"\n" +
    "         ng-repeat=\"(key, group) in grouped_fields_array | groupBy: 'group_order'\">\n" +
    "\n" +
    "        <div class=\"panel-heading\">{{group[0].group_label}}</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "            <dynamic-form-fieldset class=\"dynamic-form-fieldset\"\n" +
    "                                   ng-repeat=\"field in group\" field=\"field\" model=\"model\"\n" +
    "                                   config=\"form_field_config\" style-config=\"form_style_config\"\n" +
    "                                   errors=\"errors[field.name]\" show-validation=\"errors[field.name]\"></dynamic-form-fieldset>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form><!-- /form -->"
  );


  $templateCache.put('views/dynamic-form-no-groups.html',
    "<!-- form -->\n" +
    "<form role=\"form\" class=\"form-horizontal\">\n" +
    "\n" +
    "    <!-- no form groups -->\n" +
    "    <dynamic-form-fieldset class=\"dynamic-form-fieldset\"\n" +
    "                           ng-if=\"!has_groups\"\n" +
    "                           ng-repeat=\"field in fields_array\" field=\"field\" model=\"model\"\n" +
    "                           config=\"form_field_config\" style-config=\"form_style_config\"\n" +
    "                           errors=\"errors[field.name]\" show-validation=\"errors[field.name]\"></dynamic-form-fieldset>\n" +
    "</form><!-- /form -->\n" +
    "\n"
  );


  $templateCache.put('views/dynamic-form.html',
    "<!-- message -->\n" +
    "<div class=\"message-container\" move-with-scroll suppress=\"form_config.scroll_message\">\n" +
    "\n" +
    "    <div ng-messages=\"message_state\" class=\"message\">\n" +
    "        <div class=\"{{form_style_config.message_success_class}}\" role=\"alert\"\n" +
    "             ng-message=\"success\" ng-if=\"message.success && form_config.show_success_messages\">{{message.success}}</div>\n" +
    "        <div class=\"{{form_style_config.message_error_class}}\" role=\"alert\"\n" +
    "             ng-message=\"error\" ng-if=\"message.error && form_config.show_error_messages\">{{message.error}}</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- form -->\n" +
    "<div ng-include src=\"form_view_template\"></div>\n" +
    "\n" +
    "<!-- buttons -->\n" +
    "<div>\n" +
    "    <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\n" +
    "            class=\"{{form_style_config.submit_button_class}}\"\n" +
    "            ng-click=\"ctrl.onSubmit()\">{{form_config.submit_button_label}}</button>\n" +
    "\n" +
    "    <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\n" +
    "            class=\"{{form_style_config.submit_cancel_class}}\"\n" +
    "            ng-click=\"ctrl.onCancel()\">{{form_config.cancel_button_label}}</button>\n" +
    "\n" +
    "    <button ng-show=\"form_config.show_clear_button\" type=\"button\"\n" +
    "            class=\"{{form_style_config.submit_clear_class}}\"\n" +
    "            ng-click=\"ctrl.onClear()\">{{form_config.clear_button_label}}</button>\n" +
    "</div>"
  );


  $templateCache.put('views/inputs/checkbox-list.html',
    "<!-- checkbox-list -->\n" +
    "<label ng-repeat=\"option in field.options\">\n" +
    "    <input type=\"checkbox\" checklist-model=\"model[field.name]\" checklist-value=\"option.value\"> {{option.label}}\n" +
    "</label>"
  );


  $templateCache.put('views/inputs/checkbox.html',
    "<!-- checkbox -->\n" +
    "<input type=\"checkbox\"\n" +
    "       ng-model=\"model[field.name]\"\n" +
    "       ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\">\n"
  );


  $templateCache.put('views/inputs/currency.html',
    "<!-- currency -->\n" +
    "<div class=\"input-group\">\n" +
    "    <div class=\"input-group-addon\">{{field.symbol}}</div>\n" +
    "    <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</div>"
  );


  $templateCache.put('views/inputs/multi-select.html',
    "<!-- multi-select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" multiple size=\"{{field.type.size}}\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</select>"
  );


  $templateCache.put('views/inputs/password.html',
    "<!-- password -->\n" +
    "<input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('views/inputs/select.html',
    "<!-- select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "    <option value=\"\" disabled>Please select</option>\n" +
    "</select>"
  );


  $templateCache.put('views/inputs/text.html',
    "<!-- text -->\n" +
    "<input type=\"text\" id=\"{{field.name}}\" class=\"{{style_config.input_class}}\" placeholder=\"{{field.label}}\"\n" +
    "       ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('views/inputs/textarea.html',
    "<!-- textarea -->\n" +
    "<textarea id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "          ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\"></textarea>\n"
  );

}]);

'use strict';

(function() {

	//----------------------------------
	// DynamicForm Settings
	//----------------------------------

    var message_prefix = "AngularDynamicForm: ";

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
		})
		.constant('MESSAGE_EXTERNAL_METHOD_ERROR',                      message_prefix + "Custom method must handle its own errors")
        .constant('MESSAGE_EXTERNAL_METHOD_INVALID_RETURN',             message_prefix + "Custom method must return either Boolean value or Promise")
        .constant('MESSAGE_INVALID_STEP',                               message_prefix + "Invalid step")
        .constant('MESSAGE_UNRECOGNISED_STEP_NAME',                     message_prefix + "Unrecognised step name")
        .constant('MESSAGE_INVALID_CONFIG',                             message_prefix + "Invalid config")
        .constant('MESSAGE_INVALID_FIELDS_OBJECT',                      message_prefix + "Invalid fields object")
        .constant('MESSAGE_INVALID_OPTIONS_ARRAY',                      message_prefix + "Invalid options array")
        .constant('MESSAGE_INVALID_OPTIONS_OBJECT',                     message_prefix + "Invalid options object")
        .constant('MESSAGE_UNRECOGNISED_CONFIG_NAME',                   message_prefix + "Unrecognised config name")
        .constant('MESSAGE_INVALID_MODEL_METHOD',                       message_prefix + "Invalid model method");
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

    var DynamicFormCtrl = function($rootScope, $scope, $q, DYNAMIC_FORM_EVENTS, FieldTransformer, ConfigTransformer, SubmitService, Util, StateService) {

        var self = this;

        // control
        $scope.submit_step;

        var dont_clear_fields = ['model'];

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
                $scope.onClear("");
            }
        };

        /**
         * onCancel
         */
        this.onCancel = function() {

            if (!_.isUndefined($scope.onCancel)) {
                $scope.onCancel("");
            }
        };

        /**
         * onSubmit
         */
        this.onSubmit = function() {

            this.busy = true; // disable form (is this working?)

            // get submit steps
            var submit_steps = !_.isUndefined($scope.submit_steps) ? $scope.submit_steps : this.default_submit_steps;

            // call submit service
            SubmitService.handleSubmit(submit_steps, $scope.model, $scope.form_config).then(

                // complete
                function(message) {
                    if (!_.isUndefined($scope.onSubmitComplete)) {
                        $scope.onSubmitComplete(message);
                    }
                },

                // error
                function(message) {
                    if (!_.isUndefined($scope.onError)) {
                        $scope.onError(message);
                    }
                },

                // updates (messaging)
                function(response) {

                    console.log("STEP ::::: "+response.step);

                    // set errors
                    $scope.errors = response.data;

                    // show message
                    var form_config_message_key;
                    switch (response.step) {
                        case 'validate':    form_config_message_key = 'validation_' + response.message_state + '_message'; break;
                        case 'save':        form_config_message_key = 'save_' + response.message_state + '_message'; break;
                    }
                    self.showMessage(response.message_state, $scope.form_config[form_config_message_key]);

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
         * called when model is ready
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

            this.busy = false;
        };


        /////////////////////////////////////////////////////
        //
        // messaging
        //
        /////////////////////////////////////////////////////

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

        /**
         * hideMessage
         */
        this.hideMessage = function() {
            $scope.message = {};
            _.forEach($scope.message_state, function (item, key, obj) {
                item = false;
            });
        };


        /////////////////////////////////////////////////////
        //
        // watchers
        //
        /////////////////////////////////////////////////////

        //-----------------------------------
        // model
        //-----------------------------------

        var unWatchModel = $scope.$watch('model', function(model) {

            if (!_.isUndefined(model)) {
                self.init();
                unWatchModel();
            }
        });

    };

    DynamicFormCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$q',
        'DYNAMIC_FORM_EVENTS',
        'AngularDynamicForm.transformers.FieldTransformer',
        'AngularDynamicForm.transformers.ConfigTransformer',
        'AngularDynamicForm.helpers.SubmitService',
        'DynamicFormUtilLib',
        'DynamicFormStateService'
    ];

    angular.module('AngularDynamicForm')
        .controller('DynamicFormCtrl', DynamicFormCtrl);
})();

"use strict";

(function() {

    var dynamicForm = function() {

        return {
            restrict: 'E',
            scope: {
                model:              "=",
                fields:             "=",
                form_config:        "=config",
                form_field_config:  "=fieldConfig",
                form_style_config:  "=styleConfig",
                groups_config:      "=groupsConfig",
                submit_steps:       "=submitSteps",
                onSubmitComplete:   "&",
                onCancel:           "&",
                onClear:            "&",
                onError:            "&"
            },
            controller: 'DynamicFormCtrl as ctrl',
            link: function(scope, element, attrs, ctrl) {

                element.addClass('dynamic-form');

                // set form template
                if (!_.isUndefined(scope.groups_config)) {
                    scope.has_groups = true;
                    scope.form_view_template = "views/dynamic-form-groups.html";
                    //scope.form_view_template = "/angular-dynamic-form/lib/views/dynamic-form-groups.html";
                } else {
                    scope.has_groups = false;
                    scope.form_view_template = "views/dynamic-form-no-groups.html";
                    //scope.form_view_template = "/angular-dynamic-form/lib/views/dynamic-form-no-groups.html";
                }

                // remove function scope properties if they don't exist as attrs
                if (!_.has(attrs, 'onSubmitComplete')) {
                    delete scope.onSubmitComplete;
                }
                if (!_.has(attrs, 'onCancel')) {
                    delete scope.onCancel;
                }
                if (!_.has(attrs, 'onClear')) {
                    delete scope.onClear;
                }
                if (!_.has(attrs, 'onError')) {
                    delete scope.onError;
                }
            },
            //templateUrl: '/angular-dynamic-form/lib/views/dynamic-form.html'
            templateUrl: 'views/dynamic-form.html'
        };
    };

    dynamicForm.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicForm', dynamicForm);

})();

"use strict";

(function () {

    //----------------------------------
    // Submit Service
    //----------------------------------

    var Service = function($q,
                           ValidationService,
                           ExternalCallService,
                           MESSAGE_INVALID_STEP,
                           MESSAGE_UNRECOGNISED_STEP_NAME) {

        var self = this;

        var _submit_update_handler      = null;
        var _submit_complete_handler    = null;
        var _submit_error_handler       = null;

        var _model;
        var _form_config;

        var _last_response;


        ///////////////////////////////////////
        //
        // step handlers
        //
        ///////////////////////////////////////

        /**
         * handleSubmit
         *
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmit = function(steps, model, form_config) {

            _model = model;
            _form_config = form_config;

            var deferred = $q.defer();

            // set handlers
            _submit_complete_handler = deferred.resolve;
            _submit_update_handler = deferred.notify;
            _submit_error_handler = deferred.reject;

            // process
            self.handleSubmitSteps(0, steps);

            return deferred.promise;
        };

        /**
         * handleSubmitSteps
         *
         * @param step
         * @param steps
         */
        this.handleSubmitSteps = function(step, steps) {

            // default
            step = !_.isUndefined(step) ? step : 0;

            // step is out of range
            if (step >= steps.length) {

                // call complete handler
                if (!_.isNull(_submit_complete_handler)) {
                    _submit_complete_handler();
                }
                return;
            }

            self.handleSubmitStep(step, steps).then(

                // resolve
                function (response) {

                    // set last response
                    _last_response = response;

                    if (!_.isObject(response)) {
                        response = {};
                    }

                    // add message_state & step property to response // TODO: is this a good idea?
                    response.message_state = 'success';
                    response.step = _.isString(steps[step]) ? steps[step] : 'custom';

                    // update
                    if (!_.isNull(_submit_update_handler)) {
                        _submit_update_handler(response);
                    }

                    // continue...
                    self.handleSubmitSteps(++step, steps);
                },

                // rejection
                function (response) {

                    // set last response
                    _last_response = response;

                    // here we catch a validate or save failure before error handler
                    // TODO: should our validation return OK on failed validiton?
                    // TODO: and what about save?
                    if (steps[step] === 'validate' || steps[step] === 'save') {

                        if (!_.isObject(response)) {
                            response = {};
                        }

                        // add message_state & step property to repsonse // TODO: is this a good idea?
                        response.message_state = 'error';
                        response.step = steps[step];

                        // update
                        if (!_.isNull(_submit_update_handler)) {
                            _submit_update_handler(response);
                        }

                        // continue...
                        //self.handleSubmitSteps(++step, steps);
                        return;
                    }

                    // handle error
                    self.handleError(response);
                }
            );
        };

        /**
         * handleSubmitStep
         *
         * @param step
         * @param steps
         */
        this.handleSubmitStep = function(step, steps) {
            return $q(function(resolve, reject) {

                // step is invalid
                if (!_.isFunction(steps[step]) && !_.isString(steps[step])) {
                    throw new Error(MESSAGE_INVALID_STEP);
                    return;
                }

                // step is a custom method
                if (_.isFunction(steps[step])) {

                    // call external method with last response as arg
                    ExternalCallService.callExternalMethod(steps[step], _last_response).then(resolve, reject);
                    return;
                }

                // step is a string (internal method)
                self.handleSubmitStepInternalMethod(step, steps).then(resolve, reject);
            });
        };

        /**
         * handleSubmitStepInternalMethod
         *
         * @param step
         * @param steps
         * @returns Promise
         */
        this.handleSubmitStepInternalMethod = function(step, steps) {

            var step_method_key = steps[step];

            // invalid method
            if (!_.has(self.internal_methods, step_method_key)) {
                throw new Error(MESSAGE_UNRECOGNISED_STEP_NAME);
            }

            // call internal method
            switch (step_method_key) {

                case "validate":
                    return self.internal_methods.validate(_model, _form_config);
                    break;

                default:
                    return self.internal_methods[step_method_key]();
                    break;
            }
        };

        /**
         * handleError
         *
         * @param message
         */
        this.handleError = function(message) {

            // call error handler
            if (!_.isNull(_submit_error_handler)) {
                _submit_error_handler(message);
                return;
            }

            // log error
            console.error(message);
        };


        ///////////////////////////////////////
        //
        // internal methods
        //
        ///////////////////////////////////////

        /**
         * save
         *
         * @returns Promise
         */
        this.save = function() {

            console.log("Step X: save");

            return ExternalCallService.callExternalMethod(_model.save, [], _model);
        };


        ///////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////

        // set internal methods

        this.internal_methods = {
            'validate':     ValidationService.validate,
            'save':         this.save
        };

    };

    Service.$inject = [
        '$q',
        'AngularDynamicForm.validation.ValidationService',
        'AngularDynamicForm.helpers.ExternalCallService',
        'MESSAGE_INVALID_STEP',
        'MESSAGE_UNRECOGNISED_STEP_NAME'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.SubmitService', Service);

})();

"use strict";

(function () {

    //----------------------------------
    // External Call Service
    //----------------------------------

    var Service = function($q,
                           MESSAGE_EXTERNAL_METHOD_ERROR,
                           MESSAGE_EXTERNAL_METHOD_INVALID_RETURN) {

        var self = this;

        /**
         * callExternalMethod
         *
         * @param method
         * @param args
         * @param scope
         * @returns Promise
         */
        this.callExternalMethod = function(method, args, scope) {
            return $q(function(resolve, reject) {

                var response;

                // call method and get response
                try {

                    // TODO: start: is this the best way to do this?????
                    // here we call the method on the provided scope with provided args
                    if (!_.isUndefined(scope)) {
                        response = method.apply(scope, args);
                    }
                    // here we call the method on the current scope with args as a single argument
                    else {
                        response = method(args);
                    }
                    // TODO: end

                } catch (error) {
                    throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                }

                if (_.isUndefined(response)) {
                    throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                }

                // if method response is boolean value
                if (response === false || response === true) {

                    if (response) {
                        resolve(null);
                    } else {
                        reject(null);
                    }
                }

                // method response is a promise
                else {

                    try {
                        response.then(resolve, reject);
                    } catch (error) {

                        // not a promise
                        if (error instanceof TypeError) {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                        }

                        // unknown error
                        else {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                        }
                    }
                }
            });
        };
    };

    Service.$inject = [
        '$q',
        'MESSAGE_EXTERNAL_METHOD_ERROR',
        'MESSAGE_EXTERNAL_METHOD_INVALID_RETURN'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.ExternalCallService', Service);

})();

"use strict";

(function () {

    //----------------------------------
    // Validation Service
    //----------------------------------

    var Service = function($q,
                           ExternalCallService) {

        var self = this;

        this.validate = function(model, config) {

            console.log("Step X: validate");


            console.log(model);
            console.log(config);

            return $q(function(resolve, reject) {

                // create validation field list
                var validation_list = createValidationList(model, config);

                // call external method
                ExternalCallService.callExternalMethod(model.validate, [
                    validation_list
                ], model).then(resolve, reject);

            });
        };

        /**
         * createValidationList
         *
         * @param model
         * @param config
         * @returns {Array}
         */
        var createValidationList = function(model, config) {

            var list = [];

            // validation fields by inclusion (white list)
            if (!_.isNull(config.validate_fields)) {
                list = config.validate_fields;
            }

            // validation fields by exclusion (black list)
            else if (!_.isNull(config.validate_fields_exclude)) {

                _.forEach(model, function (item, key, obj) {
                    if (!_.include(config.validate_fields_exclude, key) && !_.include(config.validate_fields, key)) {
                        list.push(key);
                    }
                });
            }

            return list;
        };

    };

    Service.$inject = [
        '$q',
        'AngularDynamicForm.helpers.ExternalCallService'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.validation.ValidationService', Service);

})();

"use strict";

(function () {

    //----------------------------------
    // Config Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_UNRECOGNISED_CONFIG_NAME) {

        var self = this;

        var _form_config = {
            'label_camelcase':              true,
            'label_replace_underscores':    true,
            'show_error_messages':          true,
            'show_success_messages':        true,
            'show_submit_button':           true,
            'show_cancel_button':           true,
            'show_clear_button':            true,
            'submit_button_label':          "SUBMIT",
            'cancel_button_label':          "CANCEL",
            'clear_button_label':           "CLEAR",
            'validate_fields':              null,
            'validate_fields_exclude':      null,
            'validation_error_message':     "Please complete all required fields",
            'validation_success_message':   "Form is valid",
            'save_error_message':           "There was an error saving",
            'save_success_message':         "Save complete"
        };

        var _form_field_config = {
            'has_messages':                 true,
            'has_groups':                   true,
            'show_labels':                  true,
            'has_validation_feedback':      true,
            'has_required_indicator':       true
        };

        var _form_style_config = {
            'fieldset_class':               "",
            'label_class':                  "",
            'input_box_class':              "",
            'input_class':                  "",
            'validation_feedback_class':    "",
            'required_indicator_class':     "",
            'message_box_class':            "",
            'submit_button_class':          "",
            'cancel_button_class':          "",
            'clear_button_class':           "",
            'message_error_class':          "",
            'message_success_class':        ""
        };

        this.config  = {
            'form': _form_config,
            'form_field': _form_field_config,
            'form_style': _form_style_config
        };


        /**
        * transformConfig
        *
         * @param name
         * @param extension
         * @returns {}
         */
        this.transformConfig = function(name, extension) {

            if (!_.has(this.config, name)) {
                throw new Error(MESSAGE_UNRECOGNISED_CONFIG_NAME);
            }

            return _.merge(_.clone(this.config[name]), extension);
        };
    };

    Service.$inject = ['MESSAGE_UNRECOGNISED_CONFIG_NAME'];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.transformers.ConfigTransformer', Service);

})();

"use strict";

(function () {

    //----------------------------------
    // Field Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_INVALID_CONFIG,
                           MESSAGE_INVALID_FIELDS_OBJECT,
                           MESSAGE_INVALID_OPTIONS_ARRAY,
                           MESSAGE_INVALID_OPTIONS_OBJECT) {

        var self = this;

        var _config_required_keys = ['label_camelcase', 'label_replace_underscores'];
        var _fields_required_keys = ['type'];
        var _options_required_keys = ['label', 'value'];

        var _fields_defaults = {
            'text': {
                type: 'text', required: false
            },
            'textarea': {
                type: 'textarea', required: false
            },
            'currency': {
                type: 'currency', symbol: '$', required: false
            },
            'password': {
                type: 'password', required: false
            },
            'checkbox': {
                type: 'checkbox', required: false
            },
            'select': {
                type: 'select', options: [], required: false
            },
            'checkbox-list': {
                type: 'checkbox-list', options: [], required: false
            },
            'multi-select': {
                type: 'select', options: [], size: 4, required: false
            }
        };

        //----------------------------------
        // public
        //----------------------------------

        /**
        * transformFields
        *
         * @param fields
         * @param config
         * @param model
         * @returns []
         */
        this.transformFields = function(fields, config, model) {

            var result = [];

            // valdiate config
            if (_.difference(_config_required_keys, _.keys(config)).length !== 0) {
                throw new Error(MESSAGE_INVALID_CONFIG);
            }

            // process form field by type property
            _.forEach(fields, function (item, key, obj) {

                // validate field object
                if (_.difference(_fields_required_keys, _.keys(item)).length !== 0) {
                    throw new Error(MESSAGE_INVALID_FIELDS_OBJECT);
                }

                // transform field
                var _item  = transformField(item, key, config, model[key]);

                // add to array
                result.push(_item);
            });

            return result;
        };

        /**
         * transformGroupFields
         *
         * @param fields_array
         * @param config
         * @returns {Array}
         */
        this.transformGroupFields = function(fields_array, config) {

            var result = [];

            // add group to each field
            _.forEach(fields_array, function(field, index, array) {

                var group_order = 1;

                _.forEach(config, function(group) {

                    _.forEach(group.fields, function(group_field, index) {
                        if (group_field === field.name) {

                            // clone field
                            var _field = _.clone(field);

                            // add field group properties
                            _field.group_label = group.label;
                            if (_.has(group, 'order')) {
                                group_order = group.order;
                            }
                            _field.group_order = group_order;
                            _field.order = index;

                            // add to array
                            result.push(_field);
                        }

                        // sort (by order)
                        result = _.sortBy(result, 'order');
                    }, this);
                    group_order++;
                }, this);
            }, this);

            // sort (by group_order)
            result = _.sortBy(result, 'group_order');

            return result;
        };


        //----------------------------------
        // private
        //----------------------------------

        /**
         * transformField
         *
         * @param item
         * @param key
         * @param config
         * @param model
         */
        var transformField = function(item, key, config, model) {

            var result = {};

            // if a recognised field type
            if (_.has(_fields_defaults, item.type)) {

                // validate options array
                if (_.has(item, 'options')) {

                    // if not an array
                    if (!_.isArray(item.options)) {
                        throw new Error(MESSAGE_INVALID_OPTIONS_ARRAY);
                    }

                    _.forEach(item.options, function (option) {

                        // validate option object
                        if (_.difference(_options_required_keys, _.keys(option)).length !== 0) {
                            throw new Error(MESSAGE_INVALID_OPTIONS_OBJECT);
                        }
                    });
                }

                // extend default
                result =_.merge(_.clone(_fields_defaults[item.type]), item);
            }

            // custom field
            else {
                result = _.clone(item);
            }

            // add extra field properties
            if (!_.has(result[key], 'label')) {
                result.label = transformLabel(key, config.label_camelcase, config.label_replace_underscores);
            }
            result.name = key;
            result.model = model;
            result.validate = false;

            return result;
        };

        /**
         * transformLabel
         *
         * @param label
         * @param camelcase
         * @param replace_underscores
         */
        var transformLabel = function(label, camelcase, replace_underscores) {

            // replace underscores
            if (replace_underscores) {
                label = label.replace(/\_/g, " ");
            }

            // camelcase
            if (camelcase) {
                label = _.startCase(label);
            }

            return label;
        };
    };

    Service.$inject = [
        'MESSAGE_INVALID_CONFIG',
        'MESSAGE_INVALID_FIELDS_OBJECT',
        'MESSAGE_INVALID_OPTIONS_ARRAY',
        'MESSAGE_INVALID_OPTIONS_OBJECT'
    ];


    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.transformers.FieldTransformer', Service);

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

    var DynamicFormFieldsetCtrl = function($scope ,$timeout, MiscService) {

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
                $scope.errors = MiscService.validateField($scope.model, $scope.field.name); // validate field
                $scope.show_validation = true; // show validation
            }
        };

        //----------------------------------
        // onBlur
        //----------------------------------

        this.onBlur = function() {

            // if field is required
            if ($scope.field.validate) {
                $scope.errors = MiscService.validateField($scope.model, $scope.field.name); // validate field
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
                field: 				"=",
                model: 				"=",
                errors: 			"=",
                show_validation: 	"=showValidation",
                config: 	        "=",
                style_config: 	    "=styleConfig"
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
			link: function(scope, element, attrs, ctrl) {

                // add class
				element.addClass('dynamic-form-fieldset');

                // set input view template
                scope.input_view_template = "views/inputs/" + scope.field.type + ".html";
                //scope.input_view_template = "/angular-dynamic-form/lib/views/inputs/" + scope.field.type + ".html";
			},
            //templateUrl: '/angular-dynamic-form/lib/views/dynamic-form-fieldset.html'
            templateUrl: 'views/dynamic-form-fieldset.html'
        };
    };

	dynamicFormFieldset.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
