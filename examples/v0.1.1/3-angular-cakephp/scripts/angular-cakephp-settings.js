'use strict';

(function() {

	//--------------------------------------
	// AngularCakePHPApiUrl
	//--------------------------------------

	var API_URL = 'http://localhost/loyaltyone/api/';


	//--------------------------------------
	// AngularCakePHPUrlParamTransformer
    // TODO: move this to HttpQueryBuild service
	//--------------------------------------

    /**
     * UrlParamTransformer
     *
     * @param params
     * @returns {Array}
     * @constructor
     */
    var urlParamTransformer = function(params) {

        var result = [];

        _.forEach(params, function (item, key, obj) {
            if (key === 'contain') {

                var key_str = !_.isUndefined(key) && !_.isNull(key) ? key : "";
                var param = transformUrlParam(item, key_str, "");

                result.push(param.substring(1, param.length));
            } else {
                if (key && item) {
                    result.push(key + '=' + item);
                }
            }
        });

        return result;
    };

    /**
     * transformUrlParam
     *
     * @param data
     * @param key_str
     * @param result
     * @param caseA
     * @returns {*}
     */
    var transformUrlParam = function(data, key_str, result, caseA) {

        caseA = _.isUndefined(caseA) ? false : caseA;

        if (typeof data === 'string') {
            data = data.split(',');
        }

        for (var key in data) {
            if (_.isArray(data[key])) {

                // TODO: make this part recurrsive
                for (var i=0; i<data[key].length; i++) {

                    if (_.isObject(data[key][i])) {
                        for (var sub_key in data[key][i]) {
                            if (_.isArray(data[key][i][sub_key]) || _.isObject()) {
                                result = transformUrlParam(data[key][i][sub_key], key_str + '[' + key + ']' + '[' + sub_key + ']', result);
                            } else {
                                result += "&" + key_str + '[' + key + '][' + sub_key + '][' + i + ']=' + data[key][i][sub_key];
                            }
                        }
                    } else {
                        result += "&" + key_str + '[' + key + '][' + i + ']=' + data[key][i];
                    }
                }
            } else if (_.isArray(data) && _.isObject(data[key])) {
                result = transformUrlParam(data[key], key_str, result);
            } else if (_.isObject(data[key])) {
                result += "&" + key_str + '['+key+']';
                result = transformUrlParam(data[key], key_str, result, true);
            } else {
                if (caseA) {
                    result += '['+key+']=' + data[key];
                }else {
                    result += "&" + key_str + '['+key+']=' + data[key];
                }
            }
        }
        return result;
    };

    //--------------------------------------
    // AngularCakePHP Settings
    //--------------------------------------

    var config = function($provide) {

        $provide.value('AngularCakePHPApiUrl', API_URL)
        $provide.value('AngularCakePHPApiEndpointTransformer', pluralize)
        $provide.value('AngularCakePHPUrlParamTransformer', urlParamTransformer);
    };

    config.$inject = ['$provide'];

    angular.module('AngularCakePHP').config(config);

})();
