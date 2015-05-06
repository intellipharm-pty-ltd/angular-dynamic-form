describe('transformers.ConfigTransformer', function() {

    var Service;
    var $q, $rootScope;
    var MESSAGE_UNRECOGNISED_CONFIG_NAME;

    // load module
    beforeEach(function() {
        module('AngularDynamicForm');
    });

    // inject services (that we want to test)
    beforeEach(inject(function($injector) {

        Service = $injector.get('AngularDynamicForm.transformers.ConfigTransformer');

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');

        MESSAGE_UNRECOGNISED_CONFIG_NAME    = $injector.get('MESSAGE_UNRECOGNISED_CONFIG_NAME');
    }));

    //--------------------------------------------
    // transformConfig
    //--------------------------------------------

    describe('transformConfig', function() {

        it('should throw an Error if config name is not recognised', function () {

            var config = {};

            expect(function () {
                Service.transformConfig('unknown', config, {});
            }).toThrowError(MESSAGE_UNRECOGNISED_CONFIG_NAME);
        });

        it('should add default field properties for recognised config (form)', function () {

            var config = {
                label_camelcase: true
            };

            var result = Service.transformConfig('form', config);

            expect(!_.isUndefined(result.label_camelcase)).toBeTruthy();
            expect(!_.isUndefined(result.label_replace_underscores)).toBeTruthy();
        });

        it('should add default field properties for recognised config (form_field)', function () {

            var config = {
                has_messages: true
            };

            var result = Service.transformConfig('form_field', config);

            expect(!_.isUndefined(result.has_messages)).toBeTruthy();
            expect(!_.isUndefined(result.has_groups)).toBeTruthy();
        });

        it('should add default field properties for recognised config (form_style)', function () {

            var config = {
                fieldset_class: 'ASASASA'
            };

            var result = Service.transformConfig('form_style', config);

            expect(!_.isUndefined(result.fieldset_class)).toBeTruthy();
            expect(!_.isUndefined(result.label_class)).toBeTruthy();
        });
    });
});
