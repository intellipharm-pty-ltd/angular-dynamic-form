"use strict";

(function () {

	angular.module('App')
		.value('AngularCakePHPApiUrl', "http://www.google.com")
		.value('AngularCakePHPApiEndpoint', function(value) {
			return value +"s";
		});

	//-------------------------
	// App Controller
	//-------------------------

	var AppController = function ($scope, UserModel) {

        // model
		$scope.person = {
            'firstname':    "",
            'lastname':     "",
            'email':        "",
            'phone':        ""
        };

        // form config
        $scope.form_config = {
            is_edit_state: 				true,
            show_edit_button: 			false,
            show_submit_button: 		true,
            show_cancel_button: 		false,
            show_clear_button: 			false,
            has_required_indicator: 	true,
            has_validation_feedback: 	true,
            has_help_messages: 			true,
            label_camelcase: 			true,
            message_success: 			"Account Details successfully updated",
            message_error: 				"There was an error updating your Account",
            message_invalid: 			"Please complete all fields marked with an *"
        };

        // form field config
        $scope.form_field_config = {
            firstname: {
                type: 'text'
            },
            lastname: {
                type: 'text'
            },
            email: {
                type: 'email'
            },
            phone: {
                type: 'text'
            }
        };

	};

	AppController.$inject = ['$scope', 'UserModel'];

	angular.module('App').controller('AppController', AppController);

})();