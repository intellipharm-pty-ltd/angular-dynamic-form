'use strict';

(function() {

    //-------------------------
    // Util Library
    //-------------------------

    var Util = function() {

        this.format = {
            date: {
                display: 'DD-MM-YYYY',
                mysql: 'YYYY-MM-DD'
            },
            time: {
                display: 'HH:mm:SS',
                mysql: 'HH:mm:SS'
            }
        };

        //-------------------------------
        // slugify
        //
        // replace_camels
        //   ThisIs ATest = this-is-a-test
        //
        // !replace_camels
        //   ThisIs ATest = thisis-atest
        //-------------------------------

        this.slugify = function(str, replace_camels, seperator) {

            if (_.isUndefined(seperator)) {
                seperator = "-";
            }
            if (_.isString(str)) {

                if (replace_camels) {
                    str = str.replace(/^[A-Z]/, function (match) { // Lowercase First
                        return match.toLowerCase();
                    });
                    str = str.replace(/[A-Z]/g, function (match) { // Replace additional Uppercase with - then Lowercase
                        return seperator + match.toLowerCase();
                    });
                } else {
                    str = str.toLowerCase(); // Lowercase All
                }
                str = str.replace(/\s+/g, seperator); // Replace spaces with seperator
                str = str.replace(/\.+/g, seperator); // Replace dots with seperator
            } else {
                str = "";
            }

            if (seperator === '-') {
                str = str.replace(/(\-{2})/g, seperator); // Replace double dashes with singles
            }
            if (seperator === '_') {
                str = str.replace(/(\_{2})/g, seperator); // Replace double underscores with singles
            }

            return str;
        };

        //-------------------------------
        // deslugify
        //-------------------------------

        this.deslugify = function(str) {
            return str
                .toLowerCase()
                .replace(/[\.\-]+/g, ' ')
                .replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                })
                .replace(/\s+/g, '');
        };

        /**
         * formatDateForDisplay
         *
         * @param date
         * @returns {*}
         */
        this.formatDateForDisplay = function(date) {
            var m;

            if (_.isUndefined(date) || _.isNull(date)) {
                return undefined;
            }

            if (_.isString(date)) {
                m = moment(date, this.format.date.mysql);

                if (!m.isValid()) {
                    m = moment(date, this.format.date.display);
                }
            } else {
                m = moment(date);
            }

            return m.format(this.format.date.display);
        };

        /**
         * formatDateForMySQL
         *
         * @param date
         * @returns {*}
         */
        this.formatDateForMySQL = function(date) {
            var m;

            if (_.isUndefined(date) || _.isNull(date)) {
                return undefined;
            }

            if (_.isString(date)) {
                m = moment(date, this.format.date.display);

                if (!m.isValid()) {
                    m = moment(date, this.format.date.mysql);
                }
            } else {
                m = moment(date);
            }

            return m.format(this.format.date.mysql);
        };

        /**
         * formatTimeForDisplay
         *
         * @param time
         * @returns {*}
         */
        this.formatTimeForDisplay = function(time) {
            var m;

            if (_.isUndefined(time) || _.isNull(time)) {
                return undefined;
            }

            if (_.isString(time)) {
                m = moment(time, this.format.time.mysql);

                if (!m.isValid()) {
                    m = moment(time, this.format.time.display);
                }
            } else {
                m = moment(time);
            }

            return m.format(this.format.time.display);
        };

        /**
         * formatTimeForMySQL
         *
         * @param date
         * @returns {*}
         */
        this.formatTimeForMySQL = function(time) {
            var m;

            if (_.isUndefined(time) || _.isNull(time)) {
                return undefined;
            }

            if (_.isString(time)) {
                m = moment(time, this.format.time.display);

                if (!m.isValid()) {
                    m = moment(time, this.format.time.mysql);
                }
            } else {
                m = moment(time);
            }

            return m.format(this.format.time.mysql);
        };

        /**
         * formatMultiSelectForDisplay
         *
         * @param item
         * @param model
         * @returns {Array}
         */
        this.formatMultiSelectForDisplay = function(item, model) {
            var result = [];
            _.forEach(item.options, function (option) {
                if (_.has(model, option.value) && model[option.value] === true) {
                    result.push(option.value);
                }
            });
            return result;
        };

        /**
         * formatMultiSelectForMySQL
         *
         * @param item
         * @param model
         * @param key
         */
        this.formatMultiSelectForMySQL = function(item, model, key) {
            _.forEach(item.options, function (option) {
                if (_.has(model, option.value)) {
                    model[option.value] = _.includes(model[key], option.value) ? true : false;
                }
            });
            delete model[key];
        };

        /**
         * formatDecimalForMySQL
         *
         * @param data
         */
        this.formatDecimalForMySQL = function(data) {
            if (_.isUndefined(data)) {
                return undefined;
            }
            return parseFloat(data).toFixed(2);
        };
    };

    angular.module('AngularDynamicForm').constant('DynamicFormUtilLib', new Util());
})();
