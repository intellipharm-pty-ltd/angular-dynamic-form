(function() {
    'use strict';

    //----------------------------------
    // DynamicForm Settings
    //----------------------------------

    var message_prefix = 'AngularDynamicForm: ';

    angular.module('AngularDynamicForm')
        .value('AngularDynamicFormCustomInputViewUrl', 'views/inputs/')
        .constant('DYNAMIC_FORM_EVENTS', {
            init:           'dynamic-form:init',
            valid:          'dynamic-form:valid',
            invalid:        'dynamic-form:invalid',
            saveSuccess:    'dynamic-form:process-success',
            saveError:      'dynamic-form:process-error',
            submit:         'dynamic-form:submit',
            validate:       'dynamic-form:validate'
        })
        .constant('MESSAGE_EXTERNAL_METHOD_ERROR',                      message_prefix + 'Custom method must handle its own errors')
        .constant('MESSAGE_EXTERNAL_METHOD_INVALID_RETURN',             message_prefix + 'Custom method must return either Boolean value or Promise')
        .constant('MESSAGE_INVALID_STEP',                               message_prefix + 'Invalid step')
        .constant('MESSAGE_UNRECOGNISED_STEP_NAME',                     message_prefix + 'Unrecognised step name')
        .constant('MESSAGE_INVALID_CONFIG',                             message_prefix + 'Invalid config')
        .constant('MESSAGE_INVALID_FIELDS_OBJECT',                      message_prefix + 'Invalid fields object')
        .constant('MESSAGE_INVALID_OPTIONS_ARRAY',                      message_prefix + 'Invalid options array')
        .constant('MESSAGE_INVALID_OPTIONS_OBJECT',                     message_prefix + 'Invalid options object')
        .constant('MESSAGE_UNRECOGNISED_CONFIG_NAME',                   message_prefix + 'Unrecognised config name')
        .constant('MESSAGE_INVALID_MODEL_METHOD',                       message_prefix + 'Invalid model method');
})();
