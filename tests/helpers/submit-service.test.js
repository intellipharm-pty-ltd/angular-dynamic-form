describe("helpers.SubmitService", function() {

    var Service;
    var $q, $rootScope;
    var MESSAGE_EXTERNAL_METHOD_ERROR,
        MESSAGE_EXTERNAL_METHOD_INVALID_RETURN,
        MESSAGE_INVALID_STEP,
        MESSAGE_UNRECOGNISED_STEP_NAME,
        MESSAGE_INVALID_CONFIG;
    var ExternalCallServiceMock;

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

        Service = $injector.get('AngularDynamicForm.helpers.SubmitService');

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');

        MESSAGE_EXTERNAL_METHOD_ERROR           = $injector.get('MESSAGE_EXTERNAL_METHOD_ERROR');
        MESSAGE_EXTERNAL_METHOD_INVALID_RETURN  = $injector.get('MESSAGE_EXTERNAL_METHOD_INVALID_RETURN');
        MESSAGE_INVALID_STEP                    = $injector.get('MESSAGE_INVALID_STEP');
        MESSAGE_UNRECOGNISED_STEP_NAME          = $injector.get('MESSAGE_UNRECOGNISED_STEP_NAME');
        MESSAGE_INVALID_CONFIG                  = $injector.get('MESSAGE_INVALID_CONFIG');
    }));

    //--------------------------------------------
    // handleSubmitSteps
    //--------------------------------------------

    //describe("handleSubmitSteps", function() {
    //
    //    it("should call Service.handleSubmitStep for each step in array", function () {
    //
    //        var MockClass = {
    //            'mockMethod': function() {},
    //            'mockMethod2': function() {}
    //        };
    //
    //        spyOn(MockClass, 'mockMethod').and.returnValue(true);
    //        spyOn(MockClass, 'mockMethod2').and.returnValue(true);
    //
    //        spyOn(Service, 'handleSubmitStep').and.returnValue($q(function(resolve) {
    //            resolve();
    //        }));
    //
    //        var steps = [
    //            MockClass.mockMethod,
    //            MockClass.mockMethod2
    //        ];
    //
    //        Service.handleSubmitSteps(0, steps);
    //
    //        $rootScope.$apply();
    //
    //        expect(Service.handleSubmitStep.calls.count()).toEqual(2);
    //    });
    //});

    //--------------------------------------------
    // handleSubmitStep
    //--------------------------------------------

    describe("handleSubmitStep", function() {

        it("should throw an Error if step is neither function nor string (number)", function () {

            expect(function () {
                Service.handleSubmitStep(0, 123);
            }).toThrowError(MESSAGE_INVALID_STEP);
        });

        it("should throw an Error if step is neither function nor string (boolean)", function () {

            expect(function () {
                Service.handleSubmitStep(0, true);
            }).toThrowError(MESSAGE_INVALID_STEP);
        });

        it("should call ExternalCallService.callExternalMethod with step if step is function", function () {

            var steps = [
                function() {}
            ];

            spyOn(ExternalCallServiceMock, 'callExternalMethod').and.returnValue({then: function() {}});

            Service.handleSubmitStep(0, steps);

            expect(ExternalCallServiceMock.callExternalMethod).toHaveBeenCalledWith(steps[0], undefined);
        });

        it("should call Service.handleSubmitStepInternalMethod if step is string", function () {

            var steps = [
                "internal_method"
            ];

            spyOn(Service, 'handleSubmitStepInternalMethod').and.returnValue({then: function() {}});

            Service.handleSubmitStep(0, steps);

            expect(Service.handleSubmitStepInternalMethod).toHaveBeenCalled();
        });
    });

    //--------------------------------------------
    // handleSubmitStepInternalMethod
    //--------------------------------------------

    describe("handleSubmitStepInternalMethod", function() {

        it("should throw an Error if step name is not recognised", function() {

            var steps = [
                'unknown'
            ];

            expect(function() { Service.handleSubmitStepInternalMethod(0, steps); }).toThrowError(MESSAGE_UNRECOGNISED_STEP_NAME);
        });

        it("should call Service.internal_methods.validate", function() {

            var steps = [
                'validate'
            ];

            spyOn(Service.internal_methods, 'validate');

            Service.handleSubmitStepInternalMethod(0, steps);

            $rootScope.$apply();

            expect(Service.internal_methods.validate).toHaveBeenCalled();
        });

        //it("should call custom step method", function() {
        //
        //    var MockClass = {
        //        'mockMethod': function() {}
        //    };
        //
        //    spyOn(MockClass, 'mockMethod').and.returnValue(true);
        //
        //    Service.setSubmitSteps([
        //        MockClass.mockMethod
        //    ]);
        //
        //    Service.handleSubmitStepExternalMethod(0);
        //
        //    expect(MockClass.mockMethod).toHaveBeenCalled();
        //});

    });
});
