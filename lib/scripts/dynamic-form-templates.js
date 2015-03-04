angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/views/dynamic-form-fieldset.html',
    "<fieldset class=\"form-group\" ng-class=\"{\n" +
    "'has-feedback': has_validation_feedback,\n" +
    "'has-success': errors.length === 0 && show_validation && edit_state,\n" +
    "'has-error': errors.length > 0 && show_validation && edit_state,\n" +
    "'required': field.validate}\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-xs-12\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <label ng-if=\"field.label !== '' && show_label\" for=\"{{field.name}}\" class=\"control-label col-sm-3\">{{field.label}}</label>\n" +
    "\n" +
    "                <!-- edit state -->\n" +
    "\n" +
    "                <div ng-show=\"edit_state\" class=\"input-box\"\n" +
    "                     ng-switch=\"field.type\"\n" +
    "                     ng-class=\"{'col-sm-9': show_label, 'col-sm-12': !show_label}\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    <!-- text -->\n" +
    "                    <input ng-switch-when=\"text\" type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                    <!-- textarea -->\n" +
    "                    <textarea ng-switch-when=\"textarea\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                              ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\"></textarea>\n" +
    "\n" +
    "                    <!-- username -->\n" +
    "                    <div ng-switch-when=\"username\">\n" +
    "                        <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                               ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- password || password strength -->\n" +
    "                    <div ng-switch-when=\"password\">\n" +
    "                        <input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                               ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </div>\n" +
    "                    <div ng-switch-when=\"password-strength\">\n" +
    "                        <input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                               ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- currency -->\n" +
    "                    <div ng-switch-when=\"currency\" class=\"input-group\">\n" +
    "                        <div class=\"input-group-addon\">$</div>\n" +
    "                        <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                               ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- email -->\n" +
    "                    <div ng-switch-when=\"email\">\n" +
    "                        <input type=\"email\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                        <input type=\"email\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "                               ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- model-search-select -->\n" +
    "                    <div ng-switch-when=\"model-search-select\" class=\"input-group\">\n" +
    "\n" +
    "                        <auto-complete-search\n" +
    "                        query=\"field.query\"\n" +
    "                        ar-model=\"field.model\"\n" +
    "                        fields=\"name\"\n" +
    "                        limit=\"5\"\n" +
    "                        delay=\"200\"\n" +
    "                        display-field=\"name\"\n" +
    "                        on-select=\"ctrl.onModelSearchSelectSelect(data, partial)\">\n" +
    "                        </auto-complete-search>\n" +
    "\n" +
    "                        <br/>\n" +
    "\n" +
    "                        <ul style=\"list-style: disc;\">\n" +
    "                            <li style=\"margin-left: 20px;\" ng-repeat=\"item in model[field.name]\">{{item.name}}</li>\n" +
    "                        </ul>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- advanced-data-selector -->\n" +
    "\n" +
    "                    <advanced-data-selector ng-switch-when=\"data-selector\"\n" +
    "                                            field=\"field\" model=\"model\"></advanced-data-selector>\n" +
    "\n" +
    "                    <!-- select -->\n" +
    "                    <select ng-switch-when=\"select\" class=\"form-control\"\n" +
    "                            ng-model=\"model[field.name]\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "                            ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                        <option value=\"\" disabled>Please select</option>\n" +
    "                    </select>\n" +
    "\n" +
    "                    <!-- multi-select -->\n" +
    "                    <select ng-switch-when=\"multi-select\" class=\"form-control\"\n" +
    "                            ng-model=\"model[field.name]\" multiple size=\"8\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "                            ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "                    </select>\n" +
    "\n" +
    "                    <!-- checkbox -->\n" +
    "                    <input ng-switch-when=\"checkbox\" type=\"checkbox\"\n" +
    "                           ng-model=\"model[field.name]\"\n" +
    "                           ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\">\n" +
    "\n" +
    "                    <!-- checkbox-list -->\n" +
    "                    <label ng-switch-when=\"checkbox-list\" ng-repeat=\"option in field.options\">\n" +
    "                        <input type=\"checkbox\" checklist-model=\"model[field.name]\" checklist-value=\"option.value\"> {{option.label}}\n" +
    "                    </label>\n" +
    "\n" +
    "                    <!-- datepicker -->\n" +
    "                    <input ng-switch-when=\"datepicker\" type=\"text\" class=\"form-control\"\n" +
    "                           ng-click=\"datepicker_is_open = true\" ng-focus=\"datepicker_is_open = true\"\n" +
    "                           datepicker-popup=\"{{datepicker_format}}\" ng-model=\"model[field.name]\" is-open=\"datepicker_is_open\" ng-required=\"true\"\n" +
    "                           close-text=\"Close\" show-button-bar=\"true\" />\n" +
    "\n" +
    "                    <!-- timepicker -->\n" +
    "                    <timepicker ng-switch-when=\"time\" class=\"timepicker\"\n" +
    "                                ng-model=\"model[field.name]\" hour-step=\"1\" minute-step=\"10\" show-meridian=\"true\"></timepicker>\n" +
    "\n" +
    "                    <!-- toggle -->\n" +
    "                    <slide-toggle ng-switch-when=\"toggle\" ng-model=\"model[field.name]\" on-label=\"{{field.on}}\" off-label=\"{{field.off}}\" size=\"{{field.size}}\"></slide-toggle>\n" +
    "\n" +
    "\n" +
    "                    <!-- validation feedback -->\n" +
    "                    <span ng-show=\"has_validation_feedback\" class=\"glyphicon form-control-feedback\" ng-class=\"{\n" +
    "                                        'glyphicon-ok': errors.length === 0 && show_validation,\n" +
    "                                        'glyphicon-remove': errors.length > 0 && show_validation\n" +
    "                                        }\"></span>\n" +
    "\n" +
    "                    <!-- indicators -->\n" +
    "                    <span ng-show=\"field.required && has_required_indicator\" class=\"control-label required-indicator\">*</span>\n" +
    "\n" +
    "                    <!-- help text -->\n" +
    "                    <div ng-show=\"field.help && has_help_messages\" class=\"control-label help-message\">{{field.help}}</div>\n" +
    "\n" +
    "                    <!-- password strength -->\n" +
    "                    <password-strength ng-switch-when=\"password-strength\" password=\"model[field.name]\"></password-strength>\n" +
    "\n" +
    "                    <!-- staff member pin -->\n" +
    "                    <div ng-switch-when=\"pin\">\n" +
    "                        <input type=\"hidden\" ng-model=\"model[field.name]\">\n" +
    "                        <span>{{ctrl.new_pin}}</span>\n" +
    "                        <button class=\"btn btn-primary\" ng-click=\"ctrl.generateNewPin(field.name, model)\">Generate New Pin</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- google place -->\n" +
    "                    <div ng-switch-when=\"google-place\">\n" +
    "\n" +
    "                        <div ng-if=\"ctrl.google_place_manual\">\n" +
    "                            <label for=\"address1\" class=\"control-label col-sm-3\" ng-if=\"show_label\">Address Line 1</label>\n" +
    "                            <input type=\"text\" id=\"address1\" class=\"form-control\" placeholder=\"Address Line 1\"\n" +
    "                                   ng-model=\"model['address1']\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\"\n" +
    "                                   ng-disabled=\"model.form_field_config['address1'].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                            <label for=\"address2\" class=\"control-label col-sm-3\" ng-if=\"show_label\">Address Line 2</label>\n" +
    "                            <input type=\"text\" id=\"address2\" class=\"form-control\" placeholder=\"Address Line 2\"\n" +
    "                                   ng-model=\"model['address2']\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\"\n" +
    "                                   ng-disabled=\"model.form_field_config['address2'].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                            <label for=\"suburb\" class=\"control-label col-sm-3\" ng-if=\"show_label\">Suburb</label>\n" +
    "                            <input type=\"text\" id=\"suburb\" class=\"form-control\" placeholder=\"Suburb\"\n" +
    "                                   ng-model=\"model['suburb']\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\"\n" +
    "                                   ng-disabled=\"model.form_field_config['suburb'].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                            <label for=\"state\" class=\"control-label col-sm-3\" ng-if=\"show_label\">State</label>\n" +
    "                            <input type=\"text\" id=\"state\" class=\"form-control\" placeholder=\"State\"\n" +
    "                                   ng-model=\"model['state']\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\"\n" +
    "                                   ng-disabled=\"model.form_field_config['state'].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                            <label for=\"postcode\" class=\"control-label col-sm-3\" ng-if=\"show_label\">Postcode</label>\n" +
    "                            <input type=\"text\" id=\"postcode\" class=\"form-control\" placeholder=\"Postcode\"\n" +
    "                                   ng-model=\"model['postcode']\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\"\n" +
    "                                   ng-disabled=\"model.form_field_config['postcode'].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "\n" +
    "                            <button class=\"btn btn-primary\" ng-click=\"ctrl.onGooglePlaceToggle()\">Search</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-if=\"!ctrl.google_place_manual\">\n" +
    "                            <auto-complete-search\n" +
    "                                ng-show=\"!ctrl.google_place\"\n" +
    "                                query=\"field.query\"\n" +
    "                                ar-model=\"field.model\"\n" +
    "                                limit=\"5\"\n" +
    "                                delay=\"200\"\n" +
    "                                display-field=\"formatted\"\n" +
    "                                placeholder=\"'Search for an address'\"\n" +
    "                                search-field=\"address\"\n" +
    "                                on-select=\"ctrl.onGooglePlaceSelect(data, partial)\">\n" +
    "                            </auto-complete-search>\n" +
    "\n" +
    "                            <button class='btn btn-primary' ng-show=\"ctrl.google_place\" ng-click=\"ctrl.onGooglePlaceClick()\">\n" +
    "                                <div ng-if=\"ctrl.google_place.formatted\">\n" +
    "                                    {{ctrl.google_place.formatted}}\n" +
    "                                </div>\n" +
    "                                <div ng-if=\"!ctrl.google_place.formatted\">\n" +
    "                                    {{model.address1}}<span ng-if=\"model.address1 && (model.address2 || model.suburb || model.state || model.postcode)\">,</span>\n" +
    "                                    {{model.address2}}<span ng-if=\"model.address2 && (model.suburb || model.state || model.postcode)\">,</span>\n" +
    "                                    {{model.suburb}}<span ng-if=\"model.suburb && (model.state || model.postcode)\">,</span>\n" +
    "                                    {{model.state}}<span ng-if=\"model.state && (model.postcode)\">,</span>\n" +
    "                                    {{model.postcode}}\n" +
    "                                </div>\n" +
    "                            </button>\n" +
    "\n" +
    "                            <button class=\"btn btn-primary\" ng-click=\"ctrl.onGooglePlaceToggle()\" ng-show=\"!ctrl.google_place\">Enter Manually</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- read-only state -->\n" +
    "\n" +
    "                <div ng-show=\"!edit_state\" class=\"col-sm-9 input-box read-only\"\n" +
    "                     ng-switch=\"field.type\">\n" +
    "\n" +
    "                    <!-- checkbox-list -->\n" +
    "                    <ul ng-switch-when=\"checkbox-list\" ng-repeat=\"option in field.options\">\n" +
    "                        <li ng-repeat=\"value in model[field.name]\" ng-if=\"value === option.value\">{{option.label}}</li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!-- password -->\n" +
    "                    <div ng-switch-when=\"password\">&nbsp;</div>\n" +
    "\n" +
    "                    <!-- default -->\n" +
    "                    <div ng-switch-default>{{model[field.name]}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container-fluid inline-message-container\" ng-show=\"errors.length > 0 && show_validation && edit_state\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 control-label error-message\" ng-class=\"{'col-sm-offset-3 col-sm-9': show_label}\">\n" +
    "                {{errors[0]}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</fieldset>\n"
  );


  $templateCache.put('lib/views/dynamic-form.html',
    "<!-- message -->\n" +
    "<div ng-if=\"ctrl.form_config.has_messages\" class=\"message-container\" move-with-scroll suppress=\"ctrl.form_config.scroll_message\">\n" +
    "\n" +
    "    <div ng-messages=\"ctrl.message_state\" class=\"message\">\n" +
    "        <div class=\"alert alert-success\" role=\"alert\" ng-message=\"success\" ng-if=\"ctrl.message.success\">{{ctrl.message.success}}</div>\n" +
    "        <div class=\"alert alert-danger\" role=\"alert\" ng-message=\"error\" ng-if=\"ctrl.message.error\">{{ctrl.message.error}}</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- form -->\n" +
    "<form role=\"form\" class=\"form-horizontal\" ng-class=\"{'has-help-messages': ctrl.form_config.has_help_messages}\">\n" +
    "\n" +
    "    <!-- form groups (sections) -->\n" +
    "    <div ng-if=\"ctrl.form_config.has_groups\"\n" +
    "         class=\"panel panel-default form-section\"\n" +
    "         ng-repeat=\"(key, group) in ctrl.fields | groupBy: 'group_order'\">\n" +
    "\n" +
    "        <div class=\"panel-heading\">{{group[0].group_label}}</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "            <dynamic-form-fieldset class=\"dynamic-form-fieldset\"\n" +
    "                                   ng-repeat=\"field in group\" field=\"field\" model=\"model\"\n" +
    "                                   errors=\"errors[field.name]\" show-validation=\"errors[field.name]\"\n" +
    "                                   edit-state=\"ctrl.edit_state\"\n" +
    "                                   show-label=\"ctrl.show_labels\"\n" +
    "                                   has-validation-feedback=\"ctrl.form_config.has_validation_feedback\"\n" +
    "                                   has-help-messages=\"ctrl.form_config.has_help_messages\"\n" +
    "                                   has-required-indicator=\"ctrl.form_config.has_required_indicator\"></dynamic-form-fieldset>\n" +
    "\n" +
    "        </div><!-- .panel-body -->\n" +
    "    </div><!-- .panel -->\n" +
    "\n" +
    "    <!-- no form groups -->\n" +
    "\n" +
    "    <dynamic-form-fieldset ng-if=\"!ctrl.form_config.has_groups\"\n" +
    "                           ng-repeat=\"field in ctrl.fields\" field=\"field\" model=\"model\"\n" +
    "                           errors=\"errors[field.name]\" show-validation=\"errors[field.name]\"\n" +
    "                           edit-state=\"ctrl.edit_state\"\n" +
    "                           show-label=\"ctrl.show_labels\"\n" +
    "                           has-validation-feedback=\"ctrl.form_config.has_validation_feedback\"\n" +
    "                           has-help-messages=\"ctrl.form_config.has_help_messages\"\n" +
    "                           has-required-indicator=\"ctrl.form_config.has_required_indicator\"></dynamic-form-fieldset>\n" +
    "\n" +
    "    <div class=\"button-outer-container\" ng-class=\"{'labels': ctrl.show_labels}\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-12 dynamic-form-buttons\" ng-class=\"{'disabled': ctrl.busy}\">\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "\n" +
    "                    <!-- spacer for labels -->\n" +
    "                    <div ng-if=\"ctrl.show_labels\" class=\"col-sm-3\">&nbsp;</div>\n" +
    "\n" +
    "                    <!-- button-container -->\n" +
    "                    <div class=\"button-container\" ng-class=\"{'col-sm-9': ctrl.show_labels, 'col-sm-12': !ctrl.show_labels}\">\n" +
    "\n" +
    "                        <button ng-show=\"ctrl.show_edit_button && !ctrl.edit_state\" type=\"button\" class=\"btn btn-default\" ng-click=\"ctrl.onEdit()\">EDIT</button>\n" +
    "\n" +
    "                        <div ng-show=\"ctrl.edit_state\">\n" +
    "                            <button ng-show=\"ctrl.show_edit_cancel_button\" type=\"button\" class=\"btn btn-default\" ng-click=\"ctrl.onEditCancel()\">CANCEL EDIT</button>\n" +
    "                            <button ng-show=\"ctrl.show_submit_button\" type=\"submit\" class=\"btn btn-submit btn-block\" ng-click=\"ctrl.onSubmit()\">{{ctrl.submit_label}}</button>\n" +
    "                            <button ng-show=\"ctrl.show_cancel_button\" type=\"submit\" class=\"btn btn-block\" ng-click=\"ctrl.onCancel()\">CANCEL</button>\n" +
    "                            <button ng-show=\"ctrl.show_clear_button\" type=\"button\" class=\"btn btn-danger\" ng-click=\"ctrl.onClear()\">CLEAR</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div><!-- /.row -->\n" +
    "            </div>\n" +
    "        </div><!-- /.row -->\n" +
    "    </div>\n" +
    "</form><!-- /form -->\n" +
    "\n"
  );

}]);
