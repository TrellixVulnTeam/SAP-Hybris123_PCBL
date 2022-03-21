module.exports = function() {

    return {
        targets: ['all'],
        config: function(data, conf) {
            conf.all = [
                'web/features/**/*.js',
                'jsTests/**/*.js'
            ];

            return conf;
        }
    };
};
