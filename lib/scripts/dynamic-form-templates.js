angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/dynamic-form-fieldset.html',
    "<div class=\"{{style_config.fieldset_class}}\" ng-class=\"{\n" +
    "    'has-feedback': config.has_validation_feedback,\n" +
    "    'has-success': errors.length === 0 && show_validation,\n" +
    "    'has-error': errors.length > 0 && show_validation,\n" +
    "    'required': field.validate}\">\n" +
    "\n" +
    "    <label ng-if=\"field.label !== '' && config.show_labels\" for=\"{{field.name}}\"\n" +
    "           class=\"{{style_config.label_class}}\">{{field.label}}</label>\n" +
    "\n" +
    "    <!-- edit state -->\n" +
    "\n" +
    "    <div class=\"{{style_config.input_box_class}}\">\n" +
    "\n" +
    "        <div ng-include src=\"input_view_template\"></div>\n" +
    "\n" +
    "        <!-- validation feedback -->\n" +
    "        <span ng-show=\"config.has_validation_feedback\"\n" +
    "              class=\"{{style_config.validation_feedback_class}} glyphicon\"\n" +
    "              ng-class=\"{\n" +
    "              'glyphicon-ok': errors.length === 0 && show_validation,\n" +
    "              'glyphicon-remove': errors.length > 0 && show_validation\n" +
    "              }\"></span>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- indicators -->\n" +
    "    <div ng-show=\"field.required && config.has_required_indicator\" class=\"{{style_config.required_indicator_class}}\">\n" +
    "        <span>*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"errors.length > 0 && show_validation\"\n" +
    "         class=\"{{style_config.message_box_class}}\">{{errors[0]}}</div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/dynamic-form-groups.html',
    "<!-- form groups -->\n" +
    "<div ng-if=\"has_groups\"\n" +
    "     class=\"panel panel-default form-section\"\n" +
    "     ng-repeat=\"(key, group) in grouped_fields_array | groupBy: 'group_order'\">\n" +
    "\n" +
    "    <div class=\"panel-heading\">{{group[0].group_label}}</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <dynamic-form-fieldset class=\"dynamic-form-fieldset\"\n" +
    "                               ng-repeat=\"field in group\"\n" +
    "                               field=\"field\"\n" +
    "                               model=\"model\"\n" +
    "                               config=\"form_field_config\"\n" +
    "                               style-config=\"form_style_config\"\n" +
    "                               errors=\"errors[field.name]\"\n" +
    "                               show-validation=\"errors[field.name]\"\n" +
    "                               on-change=\"onChange()\"\n" +
    "                               on-blur=\"onBlur()\"></dynamic-form-fieldset>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/dynamic-form-no-groups.html',
    "<!-- no form groups -->\n" +
    "<dynamic-form-fieldset class=\"dynamic-form-fieldset\"\n" +
    "                       ng-if=\"!has_groups\"\n" +
    "                       ng-repeat=\"field in fields_array\"\n" +
    "                       field=\"field\"\n" +
    "                       model=\"model\"\n" +
    "                       config=\"form_field_config\"\n" +
    "                       style-config=\"form_style_config\"\n" +
    "                       errors=\"errors[field.name]\"\n" +
    "                       show-validation=\"errors[field.name]\"\n" +
    "                       on-change=\"onChange()\"\n" +
    "                       on-blur=\"onBlur()\"></dynamic-form-fieldset>"
  );


  $templateCache.put('views/dynamic-form.html',
    "<!-- message -->\n" +
    "<div class=\"{{form_style_config.message_box_class}}\" move-with-scroll suppress=\"form_config.scroll_message\">\n" +
    "\n" +
    "    <div ng-messages=\"message_state\" class=\"message\">\n" +
    "        <div class=\"{{form_style_config.message_success_class}}\" role=\"alert\"\n" +
    "             ng-message=\"success\" ng-if=\"message.success && form_config.show_success_messages\">{{message.success}}</div>\n" +
    "        <div class=\"{{form_style_config.message_error_class}}\" role=\"alert\"\n" +
    "             ng-message=\"error\" ng-if=\"message.error && form_config.show_error_messages\">{{message.error}}</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- form -->\n" +
    "<form role=\"form\" class=\"form-horizontal\">\n" +
    "\n" +
    "    <!-- groups or no-groups template -->\n" +
    "    <div ng-include src=\"form_view_template\"></div>\n" +
    "\n" +
    "    <!-- buttons -->\n" +
    "    <div class=\"{{form_style_config.button_box_class}}\">\n" +
    "        <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\n" +
    "                class=\"{{form_style_config.submit_button_class}}\"\n" +
    "                ng-click=\"ctrl.onSubmit()\">{{form_config.submit_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.submit_cancel_class}}\"\n" +
    "                ng-click=\"ctrl.onCancel()\">{{form_config.cancel_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_clear_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.submit_clear_class}}\"\n" +
    "                ng-click=\"ctrl.onClear()\">{{form_config.clear_button_label}}</button>\n" +
    "    </div>\n" +
    "</form><!-- /form -->"
  );


  $templateCache.put('views/inputs/checkbox.html',
    "<!-- checkbox -->\n" +
    "<input type=\"checkbox\"\n" +
    "       ng-model=\"model[field.name]\"\n" +
    "       ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\">\n"
  );


  $templateCache.put('views/inputs/currency.html',
    "<!-- currency -->\n" +
    "<div class=\"input-group\">\n" +
    "    <div class=\"input-group-addon\">{{field.symbol}}</div>\n" +
    "    <input type=\"text\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</div>"
  );


  $templateCache.put('views/inputs/multi-select.html',
    "<!-- multi-select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" multiple size=\"{{field.type.size}}\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "</select>"
  );


  $templateCache.put('views/inputs/password.html',
    "<!-- password -->\n" +
    "<input type=\"password\" id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "           ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('views/inputs/select.html',
    "<!-- select -->\n" +
    "<select class=\"form-control\"\n" +
    "        ng-model=\"model[field.name]\" ng-options=\"option.value as option.label for option in field.options\"\n" +
    "        ng-change=\"ctrl.onChange()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n" +
    "    <option value=\"\" disabled>Please select</option>\n" +
    "</select>"
  );


  $templateCache.put('views/inputs/text.html',
    "<!-- text -->\n" +
    "<input type=\"text\" id=\"{{field.name}}\" class=\"{{style_config.input_class}}\" placeholder=\"{{field.label}}\"\n" +
    "       ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\">\n"
  );


  $templateCache.put('views/inputs/textarea.html',
    "<!-- textarea -->\n" +
    "<textarea id=\"{{field.name}}\" class=\"form-control\" placeholder=\"{{field.label}}\"\n" +
    "          ng-model=\"model[field.name]\" ng-change=\"ctrl.onChange()\" ng-blur=\"ctrl.onBlur()\" ng-disabled=\"model.form_field_config[field.name].disabled\" ng-autofocus=\"field.autofocus\"></textarea>\n"
  );

}]);
