"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope, $timeout, $q) {

        var self = this;

        //--------------------------------------------------------
        // model
        //--------------------------------------------------------

        function Person(data) {

            this.first_name      = data.first_name;
            this.last_name       = data.last_name;
            this.email          = data.email;
            this.phone          = data.phone;
            this.gender         = data.gender;
            this.salutation     = data.salutation;
            this.waiver         = data.waiver;
            this.colours        = data.colours;

            this.validate = function(fields) {

                return $q(function(resolve, reject) {
                    console.log("Model Validate");
                    console.log(fields);
                    resolve({});
                });
            };

            this.save = function() {

                return $q(function(resolve, reject) {
                    console.log("Model Save");
                    resolve({});
                });
            };
        }

        //--------------------------------------------------------
        // data
        //--------------------------------------------------------

        this.person = new Person({
            'first_name':   "Richard",
            'last_name':    "Branson",
            'gender':       "F",
            'salutation':   "mrs",
            'waiver':       true,
            'colours':      ['blue']
        });

        //--------------------------------------------------------
        // config
        //--------------------------------------------------------

        // this is used to delay form initialization
        this.form1_init = false;

        // submit_steps
        this.submit_steps = [
            function() {
                console.log("extenal step");
                return true;
            }
        ];
        // form style config
        this.form_style_config = {
            'form_class':                   "form-horizontal",
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
            'message_success_class':        "alert alert-success",
            'fieldset_no_errors_class':     "",
            'fieldset_errors_class':        "",
            'field_message_error_class':    "",
            'fieldset_required_class':      "",
            'validation_no_errors_class':   "",
            'validation_errors_class':      ""
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
                    "first_name",
                    "last_name"
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
            last_name: {
                type: 'textarea'
            },
            first_name: {
                type: 'text',
                required: true,
                label: 'First Name'
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
                options: []
            },
            waiver: {
                label: 'Waiver',
                type: 'checkbox'
            },
            colours: {
                label: 'Colours',
                type: 'multi_select',
                options: [
                    {label: 'Blue', value: 'blue'},
                    {label: 'Red', value: 'red'}
                ]
            }
        };

        //--------------------------------------------------------
        // handlers
        //--------------------------------------------------------

        this.onSubmitComplete = function() {
            console.log("submit complete handler");
        };

        this.onCancel = function() {
            console.log("cancel handler");
        };

        this.onClear = function() {
            console.log("clear handler");
        };

        this.onError = function() {
            console.log("error handler");
        };

        //--------------------------------------------------------
        // methods
        //--------------------------------------------------------

        this.changeFirstName = function() {
            self.person.first_name = "Jimmy";
        };

        this.addErrors = function() {
            self.errors = {
                first_name: ["Your name is silly"],
                salutation: ["That's not a real salutation"]
            };
        };

        //--------------------------------------------------------
        // init
        //--------------------------------------------------------

        // example delayed form initialization (usefull for populating select options with http response)
        $timeout(function() {
            self.form_fields.salutation.options = [
                {label: 'Mrs.', value: 'mrs'},
                {label: 'Mister', value: 'MR'}
            ];
            self.form1_init = true;

        }, 1000);

    };

    AppController.$inject = ['$scope', '$timeout', '$q'];

    angular.module('App').controller('AppController', AppController);

})();
