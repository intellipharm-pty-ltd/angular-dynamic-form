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