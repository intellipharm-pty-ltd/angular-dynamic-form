module.exports = {
    options: {
        //disallowAnonymousFunctions: true,
        //disallowDanglingUnderscores: true,
        disallowMixedSpacesAndTabs: true,
        disallowTrailingWhitespace: true,
        disallowYodaConditions: true,
        requireCapitalizedConstructors: true,
        requireCommaBeforeLineBreak: true,
        requireCurlyBraces: ['if', 'else', 'else if', 'switch'],
        requireDotNotation: true,
        requireLineFeedAtFileEnd: true,
        //requireSpaceAfterLineComment: true,
        requireSpaceBeforeBinaryOperators: true,
        requireSpaceBeforeBlockStatements: true,
        //requireSpaceBeforeKeywords: true,
        requireSpaceBeforeObjectValues: true,
        requireSpaceBetweenArguments: true,
        requireSpacesInForStatement: true,
        safeContextKeyword: ['self'],
        validateLineBreaks: 'LF',
        validateParameterSeparator: ', ',
        validateQuoteMarks: '\'',
        validateIndentation: 4
    },
    lib: {
        src: [
            '<%= config.lib %>/scripts/**/*.js',
            '!<%= config.lib %>/scripts/dynamic-form-templates.js'
        ]
    },
    tests: {
        src: '<%= config.tests %>/scripts/**/*.js'
    },
    grunt: {
        src: [
            'Gruntfile.js',
            '<%= config.grunt %>/**/*.js'
        ]
    }
};
