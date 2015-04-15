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

            var deferred = $q.defer();

            // set handlers
            var handlers = {
                submit_complete: deferred.resolve,
                submit_update: deferred.notify,
                submit_error: deferred.reject
            };

            // process
            self.handleSubmitSteps(0, steps, model, form_config, handlers);

            return deferred.promise;
        };

        /**
         * handleSubmitSteps
         *
         * @param step
         * @param steps
         * @param model
         * @param form_config
         * @param handlers
         */
        this.handleSubmitSteps = function(step, steps, model, form_config, handlers, response) {

            // default
            step = !_.isUndefined(step) ? step : 0;

            // step is out of range
            if (step >= steps.length) {

                // call complete handler
                if (!_.isNull(handlers.submit_complete)) {
                    handlers.submit_complete(response);
                }
                return;
            }

            self.handleSubmitStep(step, steps, model, form_config).then(

                // resolve
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('success', response, step, steps, form_config, handlers);

                    // continue...
                    self.handleSubmitSteps(++step, steps, model, form_config, handlers, response);
                },

                // rejection
                function (response) {

                    // redefined model & form config
                    if (_.has(response, 'model')) {
                        model = response.model;
                    }
                    if (_.has(response, 'form_config')) {
                        form_config = response.form_config;
                    }

                    _last_response = response;
                    _last_response_type = 'success';

                    // send update
                    sendUpdate('error', response, step, steps, form_config, handlers);
                }
            );
        };

        /**
         * sendUpdate
         *
         * @param response_type
         * @param response
         * @param step
         * @param steps
         * @param form_config
         * @param handlers
         */
        var sendUpdate = function(response_type, response, step, steps, form_config, handlers) {

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
                message_state: response_type,
                step: step
            };

            // set message to form config message or response message
            args.message = !_.isNull(form_config[form_config_message_key]) ? form_config[form_config_message_key] : response.message;

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
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmitStep = function(step, steps, model, form_config) {

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
                self.handleSubmitStepInternalMethod(step, steps, model, form_config).then(resolve, reject);
            });
        };

        /**
         * handleSubmitStepInternalMethod
         *
         * @param step
         * @param steps
         * @param model
         * @param form_config
         * @returns Promise
         */
        this.handleSubmitStepInternalMethod = function(step, steps, model, form_config) {

            var step_method_key = steps[step];

            // invalid method
            if (!_.has(self.internal_methods, step_method_key)) {
                throw new Error(MESSAGE_UNRECOGNISED_STEP_NAME);
            }

            // call internal method
            switch (step_method_key) {

                case 'validate':
                    return self.internal_methods.validate(model, form_config);

                case 'save':
                    return self.internal_methods.save(model);

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
         * @param model
         * @returns Promise
         */
        this.save = function(model) {
            return ExternalCallService.callExternalMethod(model.save, [], model);
        };

        ///////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////

        // set internal methods

        this.internal_methods = {
            validate:     ValidationService.validate,
            save:         this.save
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
