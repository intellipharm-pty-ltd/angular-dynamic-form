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
