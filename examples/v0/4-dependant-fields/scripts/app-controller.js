"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($s, $timeout, $q) {

        var self = this;

        var TRANSPORT_HORSE         = 0;
        var TRANSPORT_MAGIC_CARPET  = 1;

        //--------------------------------------------------------
        // model
        //--------------------------------------------------------

        function Person(data) {
            this.transport = data.transport;

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

        $s.person = new Person({});

        //--------------------------------------------------------
        // config
        //--------------------------------------------------------

        // submit_steps
        this.submit_steps = [
            function() {
                console.log("extenal step");
                return true;
            }
        ];

        // form style config
        this.form_style_config = {
            'fieldset_class':               "form-group",
            'label_class':                  "col-sm-3",
            'input_box_class':              "col-sm-7",
            'input_class':                  "form-control",
            'validation_feedback_class':    "form-control-feedback",
            'required_indicator_class':     "col-sm-2",
            'message_box_class':            "col-sm-7 col-sm-push-3 text-left",
            'submit_button_clasi':          "btn btn-submit btn-block",
            'cancel_button_class':          "btn btn-default btn-block",
            'clear_button_class':           "btn btn-warning btn-block",
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

        // default form groups
        this.dafault_form_groups = {
            group1: {
                order: 1, label: "Group One", fields: [
                    "transport"
                ]
            }
        };

        // view form groups
        $s.form_groups = this.dafault_form_groups;

        // default form fields
        this.dafault_form_fields = {
            transport: {
                label: 'Transport',
                type: 'select',
                options: [
                    {label: 'Horse', value: TRANSPORT_HORSE},
                    {label: 'Magic Carpet', value: TRANSPORT_MAGIC_CARPET}
                ]
            }
        };

        // view form fields
        $s.form_fields = this.form_fields;

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
        // watchers
        //--------------------------------------------------------

        $s.$watchCollection('person', function(val) {

            if (!_.isUndefined(val)) {
                var fields = _.cloneDeep(self.dafault_form_fields);
                var groups = _.cloneDeep(self.dafault_form_groups);

                // transport
                switch (val.transport) {
                    case TRANSPORT_HORSE:
                        fields = _.merge(fields, {
                            brush: {
                                label: 'Brush',
                                type: 'select',
                                options: [
                                    {label: 'simple comb', value: 0},
                                    {label: 'deluxe fancy brush', value: 1}
                                ]
                            },
                            shoes: {
                                label: 'Shoes',
                                type: 'select',
                                options: [
                                    {label: 'Iron', value: 0},
                                    {label: 'Blue Suede', value: 1}
                                ]
                            }
                        });
                        groups = _.merge(groups, {
                            group2: {
                                order: 2, label: "Horse Stuff", fields: [
                                    "brush",
                                    "shoes"
                                ]
                            }
                        });
                        break;
                    case TRANSPORT_MAGIC_CARPET:
                        fields = _.merge(fields, {
                            carpet_cleaner: {
                                label: 'Carpet Cleaner',
                                type: 'select',
                                options: [
                                    {label: 'Standard', value: 0},
                                    {label: 'Premium', value: 1},
                                ]
                            }
                        });
                        groups = _.merge(groups, {
                            group2: {
                                order: 2, label: "Magic Carpet Stuff", fields: [
                                    "carpet_cleaner"
                                ]
                            }
                        });
                        break;
                }

                $s.form_fields = fields;
                $s.form_groups = groups;
            }
        });
    };

    AppController.$inject = ['$scope', '$timeout', '$q'];

    angular.module('App').controller('AppController', AppController);

})();