module.exports = function() {

    return {
        config: function(data, conf) {
            return {
                pattern: [
                    'web/features/**/*.+(ts)',
                    'jsTests/**/*.+(ts)'
                ]
            };
        }
    };
};
