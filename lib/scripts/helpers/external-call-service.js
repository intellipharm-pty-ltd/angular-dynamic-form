(function () {
    'use strict';

    //----------------------------------
    // External Call Service
    //----------------------------------

    var Service = function($q,
                           MESSAGE_EXTERNAL_METHOD_ERROR,
                           MESSAGE_EXTERNAL_METHOD_INVALID_RETURN) {

        /**
         * callExternalMethod
         *
         * @param method
         * @param args
         * @param scope
         * @returns Promise
         */
        this.callExternalMethod = function(method, args, scope) {
            return $q(function(resolve, reject) {

                var response;

                // call method and get response
                try {

                    // TODO: start: is this the best way to do this?????
                    // here we call the method on the provided scope with provided args
                    if (!_.isUndefined(scope)) {
                        response = method.apply(scope, args);
                    }
                    // here we call the method on the current scope with args as a single argument
                    else {
                        response = method(args);
                    }
                    // TODO: end

                } catch (error) {
                    console.log(error);
                    throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                }

                if (_.isUndefined(response)) {
                    throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                }

                // if method response is boolean value
                if (response === false || response === true) {

                    if (response) {
                        resolve(null);
                    } else {
                        reject(null);
                    }
                }

                // method response is a promise
                else {

                    try {
                        response.then(resolve, reject);
                    } catch (error) {

                        // not a promise
                        if (error instanceof TypeError) {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
                        }

                        // unknown error
                        else {
                            throw new Error(MESSAGE_EXTERNAL_METHOD_ERROR);
                        }
                    }
                }
            });
        };
    };

    Service.$inject = [
        '$q',
        'MESSAGE_EXTERNAL_METHOD_ERROR',
        'MESSAGE_EXTERNAL_METHOD_INVALID_RETURN'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.helpers.ExternalCallService', Service);

})();
