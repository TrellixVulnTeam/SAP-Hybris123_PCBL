module.exports = function() {

    return {
        config: function(data, conf) {
            conf.dev = {
                expand: true,
                flatten: true,
                src: ['jsTarget/*.js', 'jsTarget/*.map'],
                dest: 'web/webroot/personalizationpromotionssmartedit/js'
            }
            return conf;
        }
    }
};
