describe('validation.ValidationService', function() {

    var Service;
    var $q, $rootScope;
    var MESSAGE_INVALID_MODEL_METHOD;

    // load module
    beforeEach(function() {
        module('AngularDynamicForm');
    });

    // mocks
    beforeEach(function () {
        module(function ($provide) {
            ExternalCallServiceMock = {
                callExternalMethod: function() {}
            };
            $provide.value('AngularDynamicForm.helpers.ExternalCallService', ExternalCallServiceMock);
        });
    });

    // inject services (that we want to test)
    beforeEach(inject(function($injector) {

        Service = $injector.get('AngularDynamicForm.validation.ValidationService');

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');

        MESSAGE_INVALID_MODEL_METHOD    = $injector.get('MESSAGE_INVALID_MODEL_METHOD');
    }));

    //--------------------------------------------
    // validate
    //--------------------------------------------

    describe('validate', function() {

        it('should call ExternalCallService.callExternalMethod with model.validate', function () {

            var model = {
                validate: function() {}
            };
            var config = {};

            spyOn(ExternalCallServiceMock, 'callExternalMethod').and.returnValue({then: function() {}});

            Service.validate(model, config);

            expect(ExternalCallServiceMock.callExternalMethod).toHaveBeenCalledWith(model.validate, jasmine.any(Array), model);
        });
    });
});
