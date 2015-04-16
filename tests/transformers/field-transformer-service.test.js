describe("transformers.FieldTransformer", function() {

    var Service;
    var $q, $rootScope;
    var MESSAGE_INVALID_CONFIG,
        MESSAGE_INVALID_FIELDS_OBJECT,
        MESSAGE_INVALID_OPTIONS_ARRAY,
        MESSAGE_INVALID_OPTIONS_OBJECT;

    // load module
    beforeEach(function() {
        module('AngularDynamicForm');
    });

    // inject services (that we want to test)
    beforeEach(inject(function($injector) {

        Service = $injector.get('AngularDynamicForm.transformers.FieldTransformer');

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');

        MESSAGE_INVALID_CONFIG                              = $injector.get('MESSAGE_INVALID_CONFIG');
        MESSAGE_INVALID_FIELDS_OBJECT                       = $injector.get('MESSAGE_INVALID_FIELDS_OBJECT');
        MESSAGE_INVALID_OPTIONS_ARRAY                       = $injector.get('MESSAGE_INVALID_OPTIONS_ARRAY');
        MESSAGE_INVALID_OPTIONS_OBJECT                      = $injector.get('MESSAGE_INVALID_OPTIONS_OBJECT');
    }));

    //--------------------------------------------
    // transformFields
    //--------------------------------------------

    describe("transformGroupFields", function() {

        it("should return an array", function () {

            var data = [
                {
                    name: "name",
                    label: "Name",
                    type: "text"
                }
            ];
            var config = {
                group1: {
                    order: 1,
                    label: "Group One",
                    fields: [
                        "name",
                        "number"
                    ]
                }
            };

            var result = Service.transformGroupFields(data, config);

            expect(_.isArray(result)).toBeTruthy();
        });

        it("should add group_label, group_order & order to each item", function () {

            var data = [
                {
                    name: "name",
                    label: "Name",
                    type: "text"
                }, {
                    name: "number",
                    label: "Number",
                    type: "text"
                }
            ];
            var config = {
                group1: {
                    order: 1,
                    label: "Group One",
                    fields: [
                        "name",
                        "number"
                    ]
                }
            };

            var result = Service.transformGroupFields(data, config);

            expect(result[0].group_label).toBe("Group One");
            expect(result[0].group_order).toBe(1);
            expect(result[0].order).toBe(0);
            expect(result[1].order).toBe(1);
        });

        it("should sort groups by group's order", function () {

            var data = [
                {
                    name: "number",
                    label: "Number",
                    type: "text"
                }, {
                    name: "name",
                    label: "Name",
                    type: "text"
                }, {
                    name: "date",
                    label: "Date",
                    type: "text"
                }
            ];
            var config = {
                group1: {
                    order: 2,
                    label: "Group One",
                    fields: [
                        "name",
                        "number"
                    ]
                },
                group2: {
                    order: 1,
                    label: "Group Two",
                    fields: [
                        "date"
                    ]
                }
            };

            var result = Service.transformGroupFields(data, config);

            expect(result[0].group_label).toBe("Group Two");
            expect(result[1].group_label).toBe("Group One");
        });
    });

    //--------------------------------------------
    // transformFields
    //--------------------------------------------

    describe("transformFields", function() {

        it("should return an array", function () {

            var data = {
                'name': {
                    type: "text"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {});

            expect(_.isArray(result)).toBeTruthy();
        });

        it("should throw an Error if label_camelcase is missing from config", function () {

            var data = {
                'name': {
                    type: "text"
                }
            };
            var config = {
                'label_camelcase': true
                //'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_CONFIG);
        });

        it("should throw an Error if label_replace_underscores is missing from config", function () {

            var data = {
                'name': {
                    type: "text"
                }
            };
            var config = {
                //'label_camelcase': true,
                'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_CONFIG);
        });

        it("should add label, name, model & validate to each item", function () {

            var data = {
                'first_name': {
                    type: "text"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {'first_name': "AAAA"});

            expect(result[0].name).toBe('first_name');
            expect(result[0].label).toBe('First Name');
            expect(result[0].validate).toBe(false);
            expect(result[0].model).toBe("AAAA");
        });

        it("should throw an Error if fields item does not contain type", function () {

            var data = {
                'name': {
                    //type: "text"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_FIELDS_OBJECT);
        });

        it("should allow custom field types so long as they contain a type", function () {

            var data = {
                'name': {
                    type: "unknown"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {});

            expect(result.length).toBe(1);
        });

        it("should include custom field's povided properites", function () {

            var data = {
                'name': {
                    type: "unknown",
                    special: "I AM SPECIAL"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {});

            expect(_.has(result[0], 'special')).toBeTruthy();
        });

        it("should add default field properties for recognised field types", function () {

            var data = {
                'name': {
                    type: "select"
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {});

            expect(_.isArray(result[0].options)).toBeTruthy();
            expect(result[0].options.length).toBe(0);
            expect(result[0].required).toBeFalsy();
        });

        it("should overwrite default field properties with provided values", function () {

            var data = {
                'name': {
                    type: "select",
                    required: true,
                    options: [
                        {label: "a", value: "A"}
                    ]
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            var result = Service.transformFields(data, config, {});

            expect(_.isArray(result[0].options)).toBeTruthy();
            expect(result[0].options.length).toBe(1);
            expect(result[0].required).toBeTruthy();
        });

        it("should throw an Error if options property is not an array", function () {

            var data = {
                'name': {
                    type: "select",
                    options: "my options",
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_OPTIONS_ARRAY);
        });

        it("should throw an Error if an option property does not contain a label property", function () {

            var data = {
                'name': {
                    type: "select",
                    options: [
                        {
                            //label: "a",
                            value: "A"
                        }
                    ]
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_OPTIONS_OBJECT);
        });

        it("should throw an Error if an option property does not contain a value property", function () {

            var data = {
                'name': {
                    type: "select",
                    options: [
                        {
                            label: "a"
                            //value: "A"
                        }
                    ]
                }
            };
            var config = {
                'label_camelcase': true,
                'label_replace_underscores': true
            };

            expect(function () {
                Service.transformFields(data, config, {});
            }).toThrowError(MESSAGE_INVALID_OPTIONS_OBJECT);
        });
    });
});
