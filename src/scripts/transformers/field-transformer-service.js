(function () {
    'use strict';

    //----------------------------------
    // Field Transformer Service
    //----------------------------------

    var Service = function(MESSAGE_INVALID_CONFIG,
                           MESSAGE_INVALID_FIELDS_OBJECT,
                           MESSAGE_INVALID_OPTIONS_ARRAY,
                           MESSAGE_INVALID_OPTIONS_OBJECT) {

        var _config_required_keys = ['label_camelcase', 'label_replace_underscores'];
        var _fields_required_keys = ['type'];
        var _options_required_keys = ['label', 'value'];

        var _fields_defaults = {
            text: {
                type: 'text', required: false
            },
            textarea: {
                type: 'textarea', required: false
            },
            currency: {
                type: 'currency', symbol: '$', required: false
            },
            password: {
                type: 'password', required: false
            },
            checkbox: {
                type: 'checkbox', required: false
            },
            select: {
                type: 'select', options: [], required: false
            },
            multi_select: {
                type: 'select', options: [], size: 4, required: false
            }
        };

        //----------------------------------
        // public
        //----------------------------------

        /**
        * transformFields
        *
         * @param fields
         * @param config
         * @param model
         * @returns []
         */
        this.transformFields = function(fields, config, model) {

            var result = [];

            // validate config
            if (_.difference(_config_required_keys, _.keys(config)).length !== 0) {
                throw new Error(MESSAGE_INVALID_CONFIG);
            }

            // process form field by type property
            _.forEach(fields, function (item, key) {

                // validate field object
                if (_.difference(_fields_required_keys, _.keys(item)).length !== 0) {
                    throw new Error(MESSAGE_INVALID_FIELDS_OBJECT);
                }

                // transform field
                var _item  = transformField(item, key, config, model[key]);

                // add to array
                result.push(_item);
            });

            return result;
        };

        /**
         * transformGroupFields
         *
         * @param fields_array
         * @param config
         * @returns {Array}
         */
        this.transformGroupFields = function(fields_array, config) {

            var result = [];

            // add group to each field
            _.forEach(fields_array, function(field) {

                var group_order = 1;

                _.forEach(config, function(group, group_key) {

                    _.forEach(group.fields, function(group_field, index) {
                        if (group_field === field.name) {

                            // clone field
                            var _field = _.clone(field);

                            // add field group properties
                            _field.group_label = group.label;
                            _field.group_key = group_key;
                            
                            if (_.has(group, 'order')) {
                                group_order = group.order;
                            }
                            _field.group_order = group_order;
                            _field.order = index;

                            // add to array
                            result.push(_field);
                        }

                        // sort (by order)
                        result = _.sortBy(result, 'order');
                    }, this);
                    group_order++;
                }, this);
            }, this);

            // sort (by group_order)
            result = _.sortBy(result, 'group_order');

            return result;
        };

        //----------------------------------
        // private
        //----------------------------------

        /**
         * transformField
         *
         * @param item
         * @param key
         * @param config
         * @param model
         */
        var transformField = function(item, key, config) {//, model) {

            var result = {};

            // if a recognised field type
            if (_.has(_fields_defaults, item.type)) {

                // validate options array
                if (_.has(item, 'options')) {

                    // if not an array
                    if (!_.isArray(item.options)) {
                        throw new Error(MESSAGE_INVALID_OPTIONS_ARRAY);
                    }

                    _.forEach(item.options, function (option) {

                        // validate option object
                        if (_.difference(_options_required_keys, _.keys(option)).length !== 0) {
                            throw new Error(MESSAGE_INVALID_OPTIONS_OBJECT);
                        }
                    });
                }

                // extend default
                var defaults = _.cloneDeep(_fields_defaults[item.type]);

                // merge defaults with item
                result =_.merge(defaults, item);
            }

            // custom field
            else {
                result = _.clone(item);
            }

            // add extra field properties
            if (result.hide_label) {
                result.label = '';
                result.hide_label = true;
            } else if (!_.has(result, 'label')) {
                result.label = transformLabel(key, config.label_camelcase, config.label_replace_underscores);
            }
            result.name = key;
            result.model = _.has(item, 'model') ? item.model : null;
            result.validate = false;

            return result;
        };

        /**
         * transformLabel
         *
         * @param label
         * @param camelcase
         * @param replace_underscores
         */
        var transformLabel = function(label, camelcase, replace_underscores) {

            // replace underscores
            if (replace_underscores) {
                label = label.replace(/\_/g, ' ');
            }

            // camelcase
            if (camelcase) {
                label = _.startCase(label);
            }

            return label;
        };
    };

    Service.$inject = [
        'MESSAGE_INVALID_CONFIG',
        'MESSAGE_INVALID_FIELDS_OBJECT',
        'MESSAGE_INVALID_OPTIONS_ARRAY',
        'MESSAGE_INVALID_OPTIONS_OBJECT'
    ];

    angular.module('AngularDynamicForm')
        .service('AngularDynamicForm.transformers.FieldTransformer', Service);

})();
