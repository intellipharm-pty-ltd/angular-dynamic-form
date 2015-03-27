"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope, $q, UserModel) {

        this.user = UserModel.new();


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
            'validate_fields':              ['email', 'username']
        };

        // form field config
        this.form_field_config = {
            'has_messages':                 true,
            'has_groups':                   true,
            'show_labels':                  true,
            'has_validation_feedback':      true,
            'has_required_indicator':       true
        };

        //--------------------------------------------------------
        // fields
        //--------------------------------------------------------

        // form fields
        this.form_fields = {
            email: {
                type: 'text'
            },
            username: {
                type: 'text'
            }
        };

        //--------------------------------------------------------
        // submit steps
        //--------------------------------------------------------

        // submit_steps
        /*this.submit_steps = [
            function() {
                console.log("extenal step");
                return true;
            },
            'validate',
            function(response) {
                console.log(response);
            }
        ];*/

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


        ///**
        // * transformDataBeforeSubmit
        // *
        // * @param model
        // * @param fields_config
        // */
        //this.transformDataBeforeSubmit = function(model, fields_config) {
        //
        //    // format fields
        //    _.forEach(fields_config, function(item, key) {
        //
        //
        //        if (_.has(item, 'type') && _.has(model, key) && !_.isNull(model[key])) {
        //
        //            if (item.type === 'datepicker') {
        //                model[key] = Util.formatDateForMySQL(model[key]);
        //            }
        //
        //            /*if (item.type === 'time') {
        //             model[key] = Util.formatTimeForMySQL(model[key]);
        //             }*/
        //
        //            if (item.type === 'multi-select' && _.has(item, 'format') && item.format === 'map') {
        //                Util.formatMultiSelectForMySQL(item, model, key);
        //            }
        //
        //            if (item.type === 'currency') {
        //                model[key] = Util.formatDecimalForMySQL(model[key]);
        //            }
        //        }
        //
        //        // set undefined values to empty string if in validation array
        //        if (_.includes(self.form_config.validate_fields, key) && _.isUndefined(model[key])) {
        //            model[key] = "";
        //        }/*
        //         if (_.includes(self.form_config.validate_fields, key) && model[key] === "") {
        //         model[key] = 0;
        //         }*/
        //    });
        //};
    };

    AppController.$inject = ['$scope', '$q', 'UserModel'];

    angular.module('App').controller('AppController', AppController);

})();