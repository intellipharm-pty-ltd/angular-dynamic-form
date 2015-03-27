(function () {
    'use strict';

    //----------------------------------
    // Submit Service
    //----------------------------------

    var Service = function($q,
                           ValidationService,
                           ExternalCallService,
                           MESSAGE_INVALID_STEP,
                           MESSAGE_UNRECOGNISED_STEP_NAME) {

        var self = this;

        var _model;
        var _form_config;

        var _last_response_type;
        var _last_response;


        ///////////////////////////////////////
        //
        // step handlers
        //
        ///////////////////////////////////////

        /**
         * handleSubmit
         *
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmit = function(steps, model, form_config) {

            _model = model;
            _form_config = form_config;

            var deferred = $q.defer();

            // set handlers
            var handlers = {
                'submit_complete': deferred.resolve,
                'submit_update': deferred.notify,
                'submit_error': deferred.reject
            };

            // process
            self.handleSubmitSteps(0, steps, handlers);

            return deferred.promise;
        };

        /**
         * handleSubmitSteps
         *
         * @param step
         * @param steps
         */
        this.handleSubmitSteps = function(step, steps, handlers) {

            // default
            step = !_.isUndefined(step) ? step : 0;

            // step is out of range
            if (step >= steps.length) {

                // call complete handler
                if (!_.isNull(handlers.submit_complete)) {
                    handlers.submit_complete();
                }
                return;
            }

            self.handleSubmitStep(step, steps).then(

                // resolve
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        _model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        _form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('success', response, steps, step, handlers);

                    // continue...
                    self.handleSubmitSteps(++step, steps, handlers);
                },

                // rejection
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        _model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        _form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('error', response, steps, step, handlers);
                }
            );
        };

        /**
         * sendUpdate
         *
         * @param response_type
         * @param response
         * @param steps
         * @param step
         */
        var sendUpdate = function(response_type, response, steps, step, handlers) {


            // transform response if not an object
            if (!_.isObject(response)) {
                response = {message: response};
            }

            // get message from form config using step
            step = _.isFunction(steps[step]) ? 'custom' : steps[step];
            var form_config_message_key;

            switch (step) {
                case 'validate':    form_config_message_key = 'validation_' + response_type + '_message'; break;
                case 'save':        form_config_message_key = 'save_' + response_type + '_message'; break;
                default:            form_config_message_key = 'custom_' + response_type + '_message'; break;
            }

            var args = {
                'message_state': response_type,
                'step': step
            };

            // set message to form config message or response message
            args.message = !_.isNull(_form_config[form_config_message_key]) ? _form_config[form_config_message_key] : response.message;

            // errors
            args.errors = _.has(response, 'data') ? response.data : {};

            // send update
            if (!_.isNull(handlers.submit_update)) {
                handlers.submit_update(args);
            }
        };

        /**
         * handleSubmitStep
         *
         * @param step
         * @param steps
         */
        this.handleSubmitStep = function(step, steps) {
            return $q(function(resolve, reject) {

                // step is invalid
                if (!_.isFunction(steps[step]) && !_.isString(steps[step])) {
                    throw new Error(MESSAGE_INVALID_STEP);
                }

                // step is a custom method
                if (_.isFunction(steps[step])) {

                    // set args as last response if defined
                    var args;
                    if (!_.isUndefined(_last_response) && !_.isNull(_last_response)) {

                        if (_.isString(_last_response)) {
                            _last_response = {message: _last_response};
                        }

                        args = _last_response;
                        args.type = _last_response_type;
                    }

                    // call external method with args;
                    ExternalCallService.callExternalMethod(steps[step], args).then(resolve, reject);
                    return;
                }

                // step is a string (internal method)
                self.handleSubmitStepInternalMethod(step, steps).then(resolve, reject);
            });
        };

        /**
         * handleSubmitStepInternalMethod
         *
         * @param step
         * @param steps
         * @returns Promise
         */
        this.handleSubmitStepInternalMethod = function(step, steps) {

            var step_method_key = steps[step];

            // invalid method
            if (!_.has(self.internal_methods, step_method_key)) {
                throw new Error(MESSAGE_UNRECOGNISED_STEP_NAME);
            }

            // call internal method
            switch (step_method_key) {

                case 'validate':
                    return self.internal_methods.validate(_model, _form_config);

                default:
                    return self.internal_methods[step_method_key]();
            }
        };


        ///////////////////////////////////////
        //
        // internal methods
        //
        ///////////////////////////////////////

        /**
         * save
         *
         * @returns Promise
         */
        this.save = function() {
            return ExternalCallService.callExternalMethod(_model.save, [], _model);
        };


        ///////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////

        // set internal methods

        this.internal_methods = {
            'validate':     ValidationService.validate,
            'save':         this.save
        };

    };

    Service.$inject = [
        '$q',
        'AngularDynamicForm.validation.ValidationService',
        'AngularDynamicForm.helpers.ExternalCallService',
        'MESSAGE_INVALID_STEP',
        'MESSAGE_UNRECOGNISED_STEP_NAME'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.SubmitService', Service);

})();
