"use strict";

(function () {

    //----------------------------------
    // Submit Service
    //----------------------------------

    var Service = function($q,
                           ValidationService,
                           ExternalCallService,
                           MESSAGE_INVALID_STEP,
                           MESSAGE_UNRECOGNISED_STEP_NAME) {

        var self = this;

        var _submit_update_handler      = null;
        var _submit_complete_handler    = null;
        var _submit_error_handler       = null;

        var _model;
        var _form_config;

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
            _submit_complete_handler = deferred.resolve;
            _submit_update_handler = deferred.notify;
            _submit_error_handler = deferred.reject;

            // process
            self.handleSubmitSteps(0, steps);

            return deferred.promise;
        };

        /**
         * handleSubmitSteps
         *
         * @param step
         * @param steps
         */
        this.handleSubmitSteps = function(step, steps) {

            // default
            step = !_.isUndefined(step) ? step : 0;

            // step is out of range
            if (step >= steps.length) {

                // call complete handler
                if (!_.isNull(_submit_complete_handler)) {
                    _submit_complete_handler();
                }
                return;
            }

            self.handleSubmitStep(step, steps).then(

                // resolve
                function (response) {

                    // set last response
                    _last_response = response;

                    if (!_.isObject(response)) {
                        response = {};
                    }

                    // add message_state & step property to response // TODO: is this a good idea?
                    response.message_state = 'success';
                    response.step = _.isString(steps[step]) ? steps[step] : 'custom';

                    // update
                    if (!_.isNull(_submit_update_handler)) {
                        _submit_update_handler(response);
                    }

                    // continue...
                    self.handleSubmitSteps(++step, steps);
                },

                // rejection
                function (response) {

                    // set last response
                    _last_response = response;

                    // here we catch a validate or save failure before error handler
                    // TODO: should our validation return OK on failed validiton?
                    // TODO: and what about save?
                    if (steps[step] === 'validate' || steps[step] === 'save') {

                        if (!_.isObject(response)) {
                            response = {};
                        }

                        // add message_state & step property to repsonse // TODO: is this a good idea?
                        response.message_state = 'error';
                        response.step = steps[step];

                        // update
                        if (!_.isNull(_submit_update_handler)) {
                            _submit_update_handler(response);
                        }

                        // continue...
                        //self.handleSubmitSteps(++step, steps);
                        return;
                    }

                    // handle error
                    self.handleError(response);
                }
            );
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
                    return;
                }

                // step is a custom method
                if (_.isFunction(steps[step])) {

                    // call external method with last response as arg
                    ExternalCallService.callExternalMethod(steps[step], _last_response).then(resolve, reject);
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

                case "validate":
                    return self.internal_methods.validate(_model, _form_config);
                    break;

                default:
                    return self.internal_methods[step_method_key]();
                    break;
            }
        };

        /**
         * handleError
         *
         * @param message
         */
        this.handleError = function(message) {

            // call error handler
            if (!_.isNull(_submit_error_handler)) {
                _submit_error_handler(message);
                return;
            }

            // log error
            console.error(message);
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

            console.log("Step X: save");

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
