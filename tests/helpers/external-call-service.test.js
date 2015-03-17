describe("helpers.ExternalCallService", function() {

	var Service;
	var $q, $rootScope;
    var MESSAGE_EXTERNAL_METHOD_ERROR,
        MESSAGE_EXTERNAL_METHOD_INVALID_RETURN;

    // load module
	beforeEach(function() {
        module('AngularDynamicForm');
    });

	// inject services (that we want to test)
	beforeEach(inject(function($injector) {

		Service = $injector.get('AngularDynamicForm.helpers.ExternalCallService');

		$q = $injector.get('$q');
		$rootScope = $injector.get('$rootScope');

        MESSAGE_EXTERNAL_METHOD_ERROR             = $injector.get('MESSAGE_EXTERNAL_METHOD_ERROR');
        MESSAGE_EXTERNAL_METHOD_INVALID_RETURN    = $injector.get('MESSAGE_EXTERNAL_METHOD_INVALID_RETURN');
	}));

    //--------------------------------------------
    // callExternalMethod
    //--------------------------------------------

    describe("callExternalMethod", function() {

        it("should call method", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue(true);

			Service.callExternalMethod(MockClass.mockMethod);

            expect(MockClass.mockMethod).toHaveBeenCalled();
        });

        it("should call method with provided args", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue(true);

			Service.callExternalMethod(MockClass.mockMethod, ["A"]);

            expect(MockClass.mockMethod).toHaveBeenCalledWith(["A"]);
        });

        it("should throw an Error if method throws an error", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.throwError("");

            expect(function() { Service.callExternalMethod(MockClass.mockMethod); }).toThrowError(MESSAGE_EXTERNAL_METHOD_ERROR);
        });

        it("should throw an Error if method does not return", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod');

            expect(function() { Service.callExternalMethod(MockClass.mockMethod); }).toThrowError(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
        });

        it("should throw an Error if method returns neither boolean nor promise", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue("adsadsa");

            expect(function() { Service.callExternalMethod(MockClass.mockMethod); }).toThrowError(MESSAGE_EXTERNAL_METHOD_INVALID_RETURN);
        });

        it("should resolve if successful", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue({
                then: function(resolve, reject) {
                    resolve("my response");
                }
            });

            var result;

            Service.callExternalMethod(MockClass.mockMethod).then(function(response) {
                result = response;
            });

            $rootScope.$apply();

            expect(result).toBe("my response");

        });

        it("should reject on failure", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue({
                then: function(resolve, reject) {
                    reject("my response");
                }
            });

            var result;

            Service.callExternalMethod(MockClass.mockMethod).then(null, function(response) {
                result = response;
            });

            $rootScope.$apply();

            expect(result).toBe("my response");
        });

        it("should resolve if method returns true", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue(true);

            var result;

            Service.callExternalMethod(MockClass.mockMethod).then(function(response) {
                result = response;
            });

            $rootScope.$apply();

            expect(result).toBe(null);
        });

        it("should reject if method returns false", function() {

            var MockClass = {
                'mockMethod': function() {}
            };

            spyOn(MockClass, 'mockMethod').and.returnValue(false);

            var result;

            Service.callExternalMethod(MockClass.mockMethod).then(null, function(response) {
                result = response;
            });

            $rootScope.$apply();

            expect(result).toBe(null);
        });
    });
});