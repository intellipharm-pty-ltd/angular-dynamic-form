"use strict";

(function () {

    //----------------------------------
    // Config Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_UNRECOGNISED_CONFIG_NAME) {

        var self = this;

        var _form_config = {
            'auto_submit':                  false, // use when you need to auto submit form (eg. after redirect)
            'label_camelcase':              true,
            'label_replace_underscores':    true,
            'show_error_messages':          true,
            'show_success_messages':        true,
            'show_submit_button':           true,
            'show_cancel_button':           false,
            'show_clear_button':            false,
            'submit_button_label':          "SUBMIT",
            'cancel_button_label':          "CANCEL",
            'clear_button_label':           "CLEAR",
            'validate_fields':              null,
            'validate_fields_exclude':      null,
            'validation_error_message':     null,
            'validation_success_message':   null,
            'save_error_message':           null,
            'save_success_message':         null,
            'custom_error_message':         null,
            'custom_success_message':       null
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
