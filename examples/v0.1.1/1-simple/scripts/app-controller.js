"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope, $q) {

        // model
        function Person(data) {

            this.firstname  = data.firstname;
            this.lastname   = data.lastname;
            this.email      = data.email;
            this.phone      = data.phone;
            this.gender    = data.gender;
            this.salutation    = data.salutation;
            this.waiver    = data.waiver;
            this.colours    = data.colours;

            this.validate = function(fields) {

                return $q(function(resolve, reject) {
                    console.log("Model Validate");
                    console.log(fields);
                    resolve({});
                });
            }
        }

        this.person = new Person({
            'firstname': "Richard Branson",
            'gender': "F",
            'salutation': "mrs",
            'waiver': true,
            'colours': ['blue']
        });

        // submit_steps
        this.submit_steps = [
            function() {
                console.log("extenal step");
                return true;
            }/*,
            'validate'*/
        ];


        //--------------------------------------------------------
        // config
        //--------------------------------------------------------

        // form style config
        this.form_style_config = {
            'fieldset_class':               "form-group",
            'label_class':                  "col-sm-3",
            'input_box_class':              "col-sm-7",
            'input_class':                  "form-control",
            'validation_feedback_class':    "form-control-feedback",
            'required_indicator_class':     "col-sm-2",
            'message_box_class':            "col-sm-7 col-sm-push-3 text-left",
            'submit_button_class':          "btn btn-submit btn-block",
            'cancel_button_class':          "btn btn-default btn-block",
            'clear_button_class':           "btn btn-warning btn-block",
            'message_error_class':          "alert alert-danger",
            'message_success_class':        "alert alert-success"
        };

        // form config
        this.form_config = {
            'label_camelcase':              true,
            'label_replace_underscores':    true,
            //'validate_fields':              ['firstname', 'lastname']
            'validate_fields_exclude':      ['firstname', 'lastname']
        };

        // form field config
        this.form_field_config = {
            'has_messages':                 true,
            'has_groups':                   true,
            'show_labels':                  true,
            'has_validation_feedback':      true,
            'has_required_indicator':       true
        };

        this.form_groups_config = {
            group1: {
                order: 2, label: "Group One", fields: [
                    "firstname",
                    "lastname"
                ]
            },
            group2: {
                order: 1, label: "Group Two", fields: [
                    "email",
                    "phone"
                ]
            }
        };

        //--------------------------------------------------------
        // fields
        //--------------------------------------------------------

        // form fields
        this.form_fields = {
            firstname: {
                type: 'text',
                required: true,
                label: 'First Name'
            },
            last_name: {
                type: 'textarea'
            },
            email: {
                type: 'text',
                label: 'Email'
            },
            phone: {
                type: 'text'
            },
            money: {
                type: 'currency',
                symbol: 'R'
            },
            password: {
                type: 'password'
            },
            gender: {
                label: 'Gender',
                type: 'select',
                options: [
                    {label: 'Female', value: 'F'},
                    {label: 'Male', value: 'M'}
                ]
            },
            salutation: {
                type: 'select',
                options: [
                    {label: 'Mrs.', value: 'mrs'},
                    {label: 'Mister', value: 'MR'}
                ]
            },
            waiver: {
                label: 'Waiver',
                type: 'checkbox'
            },
            colours: {
                label: 'Colours',
                type: 'multi-select',
                options: [
                    {label: 'Blue', value: 'blue'},
                    {label: 'Red', value: 'red'}
                ]
            }
        };

        //--------------------------------------------------------
        // handlers
        //--------------------------------------------------------

        this.onSubmitComplete = function(message) {
            console.log("submit complete handler:: " + message);
        };

        this.onCancel = function(message) {
            console.log("cancel handler:: " + message);
        };

        this.onClear = function(message) {
            console.log("clear handler:: " + message);
        };

        this.onError = function(message) {
            console.log("error handler:: " + message);
        };

    };

    AppController.$inject = ['$scope', '$q'];

    angular.module('App').controller('AppController', AppController);

})();