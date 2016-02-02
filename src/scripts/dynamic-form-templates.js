angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-dynamic-form/views/dynamic-form-fieldset.html',
    "<div class=\"dynamic-form-fieldset\" ng-class=\"style_config.fieldset_class\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-class=\"style_config.input_and_label_box_class\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <label ng-if=\"field.label !== '' && config.show_labels\" for=\"{{field.name}}\"\r" +
    "\n" +
    "               ng-class=\"style_config.label_class\">{{field.label}}</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- edit state -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- <div ng-class=\"DynamicFormFieldset.inputBoxClass()\"> -->\r" +
    "\n" +
    "        <div ng-class=\"dynamic_style_config.input_box_class\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div ng-include src=\"input_view_template\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <!-- validation feedback -->\r" +
    "\n" +
    "            <span ng-if=\"config.has_validation_feedback && show_validation\"\r" +
    "\n" +
    "                  ng-class=\"style_config.validation_feedback_class\"></span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- indicators -->\r" +
    "\n" +
    "        <div ng-if=\"field.required && config.has_required_indicator\"\r" +
    "\n" +
    "             ng-class=\"style_config.required_indicator_class\">\r" +
    "\n" +
    "            <span>*</span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- <div class=\"clearfix\"></div> -->\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-show=\"errors.length > 0\"\r" +
    "\n" +
    "         ng-class=\"dynamic_style_config.field_error_message_box_class\">{{errors[0]}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-groups.html',
    "<!-- form groups -->\r" +
    "\n" +
    "<div ng-if=\"has_groups\"\r" +
    "\n" +
    "     class=\"panel panel-default form-section\"\r" +
    "\n" +
    "     ng-repeat=\"(key, group) in grouped_fields_array | groupBy: 'group_order'\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-heading\">{{group[0].group_label}}</div>\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <dynamic-form-fieldset ng-repeat=\"field in group\"\r" +
    "\n" +
    "                               field=\"field\"\r" +
    "\n" +
    "                               model=\"model\"\r" +
    "\n" +
    "                               config=\"form_field_config\"\r" +
    "\n" +
    "                               style-config=\"form_style_config\"\r" +
    "\n" +
    "                               all-errors=\"errors\"\r" +
    "\n" +
    "                               show-validation=\"has_submitted\"\r" +
    "\n" +
    "                               on-keypress=\"DynamicForm.onFieldKeypress($event, field)\"\r" +
    "\n" +
    "                               on-change=\"DynamicForm.onFieldChange(field)\"\r" +
    "\n" +
    "                               on-blur=\"DynamicForm.onFieldBlur(field)\"></dynamic-form-fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-no-groups.html',
    "<!-- no form groups -->\r" +
    "\n" +
    "<dynamic-form-fieldset ng-if=\"!has_groups\"\r" +
    "\n" +
    "                       ng-repeat=\"field in fields_array\"\r" +
    "\n" +
    "                       field=\"field\"\r" +
    "\n" +
    "                       model=\"model\"\r" +
    "\n" +
    "                       config=\"form_field_config\"\r" +
    "\n" +
    "                       style-config=\"form_style_config\"\r" +
    "\n" +
    "                       all-errors=\"errors\"\r" +
    "\n" +
    "                       show-validation=\"has_submitted\"\r" +
    "\n" +
    "                       on-keypress=\"DynamicForm.onFieldKeypress($event, field)\"\r" +
    "\n" +
    "                       on-change=\"DynamicForm.onFieldChange(field)\"\r" +
    "\n" +
    "                       on-blur=\"DynamicForm.onFieldBlur(field)\"></dynamic-form-fieldset>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form.html',
    "<!-- message -->\r" +
    "\n" +
    "<div class=\"{{form_style_config.message_box_class}}\" move-with-scroll suppress=\"form_config.scroll_message\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-messages=\"message_state\" class=\"message\">\r" +
    "\n" +
    "        <div class=\"{{form_style_config.message_success_class}}\" role=\"alert\"\r" +
    "\n" +
    "             ng-message=\"success\" ng-if=\"message.success && form_config.show_success_messages\">{{message.success}}</div>\r" +
    "\n" +
    "        <div class=\"{{form_style_config.message_error_class}}\" role=\"alert\"\r" +
    "\n" +
    "             ng-message=\"error\" ng-if=\"message.error && form_config.show_error_messages\">{{message.error}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!-- form -->\r" +
    "\n" +
    "<form role=\"form\" class=\"{{form_style_config.form_class}}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- groups or no-groups template -->\r" +
    "\n" +
    "    <div ng-include src=\"form_view_template\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- buttons -->\r" +
    "\n" +
    "    <div class=\"{{form_style_config.button_box_class}}\" ng-show=\"show_buttons && (form_config.show_submit_button || form_config.show_cancel_button || form_config.show_clear_button)\">\r" +
    "\n" +
    "        <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\r" +
    "\n" +
    "                class=\"{{form_style_config.submit_button_class}}\"\r" +
    "\n" +
    "                ng-click=\"DynamicForm.onSubmit()\"\r" +
    "\n" +
    "                ng-disabled=\"is_submitting\">\r" +
    "\n" +
    "                {{form_config.submit_button_label}}\r" +
    "\n" +
    "                <i class=\"{{form_style_config.is_submitting_icon}}\" ng-show=\"is_submitting && form_style_config.is_submitting_icon\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\r" +
    "\n" +
    "                class=\"{{form_style_config.cancel_button_class}}\"\r" +
    "\n" +
    "                ng-click=\"DynamicForm.onCancel()\"\r" +
    "\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.cancel_button_label}}</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button ng-show=\"form_config.show_clear_button\" type=\"button\"\r" +
    "\n" +
    "                class=\"{{form_style_config.clear_button_class}}\"\r" +
    "\n" +
    "                ng-click=\"DynamicForm.onClear()\"\r" +
    "\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.clear_button_label}}</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</form><!-- /form -->\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/checkbox.html',
    "<input\r" +
    "\n" +
    "    type=\"checkbox\"\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    ">\r" +
    "\n" +
    "\r" +
    "\n" +
    "<label for=\"{{field.name}}\" class=\"{{style_config.right_label_class}}\" ng-if=\"field.right_label !== '' && config.show_right_labels\">\r" +
    "\n" +
    "    {{field.right_label}}\r" +
    "\n" +
    "</label>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/multi_select.html',
    "<select\r" +
    "\n" +
    "    class=\"form-control\"\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    multiple=\"true\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-options=\"option.value as option.label for option in field.options\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    "    ng-attr-size=\"{{field.size}}\"\r" +
    "\n" +
    ">\r" +
    "\n" +
    "</select>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/number.html',
    "<input\r" +
    "\n" +
    "    type=\"number\"\r" +
    "\n" +
    "    id=\"{{field.name}}\"\r" +
    "\n" +
    "    class=\"{{style_config.input_class}}\"\r" +
    "\n" +
    "    placeholder=\"{{field.label}}\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-blur=\"DynamicFormFieldset.onBlur()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    ">\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/password.html',
    "<input\r" +
    "\n" +
    "    type=\"password\"\r" +
    "\n" +
    "    id=\"{{field.name}}\"\r" +
    "\n" +
    "    class=\"form-control\"\r" +
    "\n" +
    "    placeholder=\"{{field.label}}\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-blur=\"DynamicFormFieldset.onBlur()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    ">\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/select.html',
    "<select\r" +
    "\n" +
    "    class=\"form-control\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-model=\"$parent.value\" ng-options=\"option.value as option.label for option in field.options\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    ">\r" +
    "\n" +
    "    <option value=\"\" disabled>Please select</option>\r" +
    "\n" +
    "</select>\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/text.html',
    "<input\r" +
    "\n" +
    "    type=\"text\"\r" +
    "\n" +
    "    id=\"{{field.name}}\"\r" +
    "\n" +
    "    class=\"{{style_config.input_class}}\"\r" +
    "\n" +
    "    placeholder=\"{{field.label}}\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-blur=\"DynamicFormFieldset.onBlur()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    ">\r" +
    "\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/textarea.html',
    "<textarea\r" +
    "\n" +
    "    id=\"{{field.name}}\"\r" +
    "\n" +
    "    class=\"form-control\"\r" +
    "\n" +
    "    placeholder=\"{{field.label}}\".\r" +
    "\n" +
    "\r" +
    "\n" +
    "    ng-model=\"$parent.value\"\r" +
    "\n" +
    "    ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\r" +
    "\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\r" +
    "\n" +
    "    ng-blur=\"DynamicFormFieldset.onBlur()\"\r" +
    "\n" +
    "    ng-disabled=\"field.disabled\"\r" +
    "\n" +
    "    autofocus=\"{{field.autofocus}}\"\r" +
    "\n" +
    "    ng-attr-title=\"{{field.title}}\"\r" +
    "\n" +
    "></textarea>\r" +
    "\n"
  );

}]);
