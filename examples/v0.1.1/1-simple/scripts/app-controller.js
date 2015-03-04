"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope) {

        this.tester = [
            {group: "B", name: "asdsad"},
            {group: "B", name: "xcvc"},
            {group: "A", name: "wqeqw"},
            {group: "A", name: "jhgh"},
            {group: "B", name: "uiuy"},
            {group: "A", name: "jhkj"},
            {group: "C", name: "mbnmnb"}
        ];

        // model
        this.person = {
            'firstname':    "",
            'lastname':     "",
            'email':        "",
            'phone':        ""
        };

        // form config
        this.form_config = {};

        // form field config
        this.form_field_config = {
            firstname: {
                type: 'text'
            },
            lastname: {
                type: 'text'
            },
            email: {
                type: 'email'
            },
            phone: {
                type: 'text'
            }
        };

    };

    AppController.$inject = ['$scope'];

    angular.module('App').controller('AppController', AppController);

})();