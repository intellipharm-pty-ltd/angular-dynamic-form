angular.module('AngularDynamicForm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-dynamic-form/views/dynamic-form-fieldset.html',
    "<div class=\"dynamic-form-fieldset\" ng-class=\"style_config.fieldset_class\">\n" +
    "\n" +
    "    <div ng-class=\"style_config.input_and_label_box_class\">\n" +
    "\n" +
    "        <label ng-if=\"field.label !== '' && config.show_labels && field.hide_label !== true\" for=\"{{field.name}}\"\n" +
    "               ng-class=\"(field.hide_label || field.full_width) ? style_config.input_box_no_label_class : style_config.label_class\">{{field.label}}</label>\n" +
    "\n" +
    "        <!-- edit state -->\n" +
    "\n" +
    "        <!-- <div ng-class=\"DynamicFormFieldset.inputBoxClass()\"> -->\n" +
    "        <div ng-class=\"(field.hide_label || field.full_width) ? style_config.input_box_no_label_class : dynamic_style_config.input_box_class\">\n" +
    "\n" +
    "            <div ng-include src=\"input_view_template\"></div>\n" +
    "\n" +
    "            <!-- validation feedback -->\n" +
    "            <span ng-if=\"config.has_validation_feedback && show_validation\"\n" +
    "                  ng-class=\"style_config.validation_feedback_class\"></span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- indicators -->\n" +
    "        <div ng-if=\"field.required && config.has_required_indicator\"\n" +
    "             ng-class=\"style_config.required_indicator_class\">\n" +
    "            <span>*</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- <div class=\"clearfix\"></div> -->\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"errors.length > 0 && !field.hide_errors\"\n" +
    "         ng-class=\"dynamic_style_config.field_error_message_box_class\">{{errors[0]}}</div>\n" +
    "</div>\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-groups.html',
    "<!-- form groups -->\n" +
    "<div ng-if=\"has_groups\"\n" +
    "     class=\"panel panel-default form-section form-group-{{group[0].group_key}}\"\n" +
    "     ng-repeat=\"(key, group) in grouped_fields_array | groupBy: 'group_order'\">\n" +
    "\n" +
    "    <div class=\"panel-heading\">{{group[0].group_label}}</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <dynamic-form-fieldset ng-repeat=\"field in group\"\n" +
    "                               field=\"field\"\n" +
    "                               model=\"model\"\n" +
    "                               config=\"form_field_config\"\n" +
    "                               style-config=\"form_style_config\"\n" +
    "                               all-errors=\"errors\"\n" +
    "                               show-validation=\"has_submitted\"\n" +
    "                               on-keypress=\"DynamicForm.onFieldKeypress($event, field)\"\n" +
    "                               on-change=\"DynamicForm.onFieldChange(field)\"\n" +
    "                               on-blur=\"DynamicForm.onFieldBlur(field)\"></dynamic-form-fieldset>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form-no-groups.html',
    "<!-- no form groups -->\n" +
    "<dynamic-form-fieldset ng-if=\"!has_groups\"\n" +
    "                       ng-repeat=\"field in fields_array\"\n" +
    "                       field=\"field\"\n" +
    "                       model=\"model\"\n" +
    "                       config=\"form_field_config\"\n" +
    "                       style-config=\"form_style_config\"\n" +
    "                       all-errors=\"errors\"\n" +
    "                       show-validation=\"has_submitted\"\n" +
    "                       on-keypress=\"DynamicForm.onFieldKeypress($event, field)\"\n" +
    "                       on-change=\"DynamicForm.onFieldChange(field)\"\n" +
    "                       on-blur=\"DynamicForm.onFieldBlur(field)\"></dynamic-form-fieldset>\n"
  );


  $templateCache.put('angular-dynamic-form/views/dynamic-form.html',
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
    "<form role=\"form\" class=\"{{form_style_config.form_class}}\">\n" +
    "\n" +
    "    <!-- groups or no-groups template -->\n" +
    "    <div ng-include src=\"form_view_template\"></div>\n" +
    "\n" +
    "    <!-- buttons -->\n" +
    "    <div class=\"{{form_style_config.button_box_class}}\" ng-show=\"show_buttons && (form_config.show_submit_button || form_config.show_cancel_button || form_config.show_clear_button)\">\n" +
    "        <button ng-show=\"form_config.show_submit_button\" type=\"submit\"\n" +
    "                class=\"{{form_style_config.submit_button_class}}\"\n" +
    "                ng-click=\"DynamicForm.onSubmit()\"\n" +
    "                ng-disabled=\"is_submitting\">\n" +
    "                {{form_config.submit_button_label}}\n" +
    "                <i class=\"{{form_style_config.is_submitting_icon}}\" ng-show=\"is_submitting && form_style_config.is_submitting_icon\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_cancel_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.cancel_button_class}}\"\n" +
    "                ng-click=\"DynamicForm.onCancel()\"\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.cancel_button_label}}</button>\n" +
    "\n" +
    "        <button ng-show=\"form_config.show_clear_button\" type=\"button\"\n" +
    "                class=\"{{form_style_config.clear_button_class}}\"\n" +
    "                ng-click=\"DynamicForm.onClear()\"\n" +
    "                ng-disabled=\"is_submitting\">{{form_config.clear_button_label}}</button>\n" +
    "    </div>\n" +
    "</form><!-- /form -->\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/checkbox.html',
    "<input type=\"checkbox\"\n" +
    "       id=\"{{field.name}}\"\n" +
    "       ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "       ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "       ng-disabled=\"field.disabled\"\n" +
    "       ng-attr-title=\"{{field.title}}\"\n" +
    "       ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n" +
    "\n" +
    "<label for=\"{{field.name}}\" class=\"{{style_config.right_label_class}}\" ng-if=\"field.right_label !== '' && config.show_right_labels\">\n" +
    "    {{field.right_label}}\n" +
    "</label>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/multi_select.html',
    "<select\n" +
    "    id=\"{{field.name}}\"\n" +
    "    class=\"form-control\"\n" +
    "    multiple=\"true\"\n" +
    "\n" +
    "    ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "    ng-disabled=\"field.disabled\"\n" +
    "    ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "    ng-attr-title=\"{{field.title}}\"\n" +
    "    ng-attr-size=\"{{field.size}}\"\n" +
    "	ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n" +
    "    <option ng-repeat=\"option in field.options\" ng-value=\"option.value\" ng-disabled=\"option.disabled\">{{option.label}}</option>\n" +
    "</select>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/number.html',
    "<input id=\"{{field.name}}\"\n" +
    "       type=\"number\"\n" +
    "       class=\"{{style_config.input_class}}\"\n" +
    "       placeholder=\"{{field.placeholder || field.label}}\"\n" +
    "\n" +
    "       ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "       ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\n" +
    "       ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "       ng-blur=\"DynamicFormFieldset.onBlur()\"\n" +
    "       ng-disabled=\"field.disabled\"\n" +
    "       ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "       ng-attr-title=\"{{field.title}}\"\n" +
    "	   ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/password.html',
    "<input id=\"{{field.name}}\"\n" +
    "       type=\"password\"\n" +
    "       class=\"form-control\"\n" +
    "       placeholder=\"{{field.placeholder || field.label}}\"\n" +
    "\n" +
    "       ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "       ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\n" +
    "       ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "       ng-blur=\"DynamicFormFieldset.onBlur()\"\n" +
    "       ng-disabled=\"field.disabled\"\n" +
    "       ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "       ng-attr-title=\"{{field.title}}\"\n" +
    "	   ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/select.html',
    "<select\n" +
    "    id=\"{{field.name}}\"\n" +
    "    class=\"form-control\"\n" +
    "\n" +
    "    ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "    ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "    ng-disabled=\"field.disabled\"\n" +
    "    ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "    ng-attr-title=\"{{field.title}}\"\n" +
    "	ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n" +
    "    <option value=\"\" disabled>Please select</option>\n" +
    "    <option ng-repeat=\"option in field.options\" ng-value=\"option.value\" ng-disabled=\"option.disabled\">{{option.label}}</option>\n" +
    "</select>\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/text.html',
    "<input id=\"{{field.name}}\"\n" +
    "       type=\"text\"\n" +
    "       class=\"{{style_config.input_class}}\"\n" +
    "       placeholder=\"{{field.placeholder || field.label}}\"\n" +
    "\n" +
    "       ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "       ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\n" +
    "       ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "       ng-blur=\"DynamicFormFieldset.onBlur()\"\n" +
    "       ng-disabled=\"field.disabled\"\n" +
    "       ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "       ng-attr-title=\"{{field.title}}\"\n" +
    "	   ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    ">\n"
  );


  $templateCache.put('angular-dynamic-form/views/inputs/textarea.html',
    "<textarea id=\"{{field.name}}\"\n" +
    "          class=\"form-control\"\n" +
    "          placeholder=\"{{field.placeholder || field.label}}\".\n" +
    "\n" +
    "          ng-model=\"DynamicFormFieldset.field_value\"\n" +
    "          ng-keypress=\"DynamicFormFieldset.onKeypress($event)\"\n" +
    "          ng-change=\"DynamicFormFieldset.onChange()\"\n" +
    "          ng-blur=\"DynamicFormFieldset.onBlur()\"\n" +
    "          ng-disabled=\"field.disabled\"\n" +
    "          ng-attr-autofocus=\"{{field.autofocus}}\"\n" +
    "          ng-attr-title=\"{{field.title}}\"\n" +
    "		  ng-attr-autocomplete=\"{{field.autocomplete}}\"\n" +
    "></textarea>\n"
  );

}]);
