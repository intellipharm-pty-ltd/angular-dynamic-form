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
            this.custom      = data.custom;

            this.validate = function() {
                return $q(function(resolve, reject) {
                    console.log("Model Validate");
                    resolve({});
                });
            }
        }

        this.person = new Person({
            'firstname': "Richard Branson",
            'custom': "Custom Value"
        });

        // submit_steps
        this.submit_steps = [
            this.transformDataBeforeSubmit
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
            'message_error_class':          "alert alert-danger",
            'message_success_class':        "alert alert-success"
        };

        // form config
        this.form_config = {
            'label_camelcase':              true,
            'label_replace_underscores':    true
        };

        // form field config
        this.form_field_config = {
            'has_messages':                 true,
            'has_groups':                   true,
            'show_labels':                  true,
            'has_validation_feedback':      true,
            'has_required_indicator':       true
        };

        // form field config
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
                type: 'currency'/*,
                symbol: '$'*/
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
            waiver: {
                label: 'Waiver',
                type: 'checkbox'
            },
            morecolours: {
                label: 'More Colours',
                type: 'multi-select',
                size: 20,
                options: [
                    {label: 'Blue', value: 'blue'},
                    {label: 'Red', value: 'red'}
                ]
            },
            custom: {
                label: 'Custom Field',
                type: 'custom'
            }
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

    };

    AppController.$inject = ['$scope', '$q'];

    angular.module('App').controller('AppController', AppController);

})();