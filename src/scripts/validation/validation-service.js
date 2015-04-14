(function () {
    'use strict';

    //----------------------------------
    // Validation Service
    //----------------------------------

    var Service = function($q, ExternalCallService) {

        /**
         * validate
         *
         * @param model
         * @param config
         * @returns {*}
         */
        this.validate = function(model, config) {

            return $q(function(resolve, reject) {

                // create validation field list
                var validation_list = createValidationList(model, config);

                // call external method
                ExternalCallService.callExternalMethod(model.validate, [
                    validation_list
                ], model).then(resolve, reject);

            });
        };

        /**
         * createValidationList
         *
         * @param model
         * @param config
         * @returns {Array}
         */
        var createValidationList = function(model, config) {

            var list = [];

            // validation fields by inclusion (white list)
            if (!_.isNull(config.validate_fields)) {
                list = config.validate_fields;
            }

            // validation fields by exclusion (black list)
            else if (!_.isNull(config.validate_fields_exclude)) {

                _.forEach(model, function (item, key) {
                    if (!_.include(config.validate_fields_exclude, key) && !_.include(config.validate_fields, key)) {
                        list.push(key);
                    }
                });
            }

            //console.log(model);
            //console.log(config);
            //console.log(list);

            return list;
        };

    };

    Service.$inject = ['$q', 'AngularDynamicForm.helpers.ExternalCallService'];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.validation.ValidationService', Service);

})();
