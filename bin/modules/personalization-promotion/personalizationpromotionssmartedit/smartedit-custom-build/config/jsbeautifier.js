module.exports = function() {

    return {
        targets: ['files'],
        config: function(data, conf) {
            conf.files = [
                'Gruntfile.js',
                'web/features/**/*.js',
                'web/features/**/*.html',
                'web/styling/**/*.css',
                'jsTests/**/*.js',
                'smartedit-custom-build/**/*.+(js|html)'
            ];

            return conf;
        }
    };
};
