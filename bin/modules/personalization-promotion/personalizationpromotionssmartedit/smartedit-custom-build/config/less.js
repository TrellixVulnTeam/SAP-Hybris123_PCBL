module.exports = function() {

    return {
        targets: ['dev'],
        config: function(data, conf) {
            return {
                dev: {
                    files: [{
                        expand: true,
                        cwd: 'web/features/styling',
                        src: 'style.less',
                        dest: 'web/webroot/css/',
                        ext: '.css'
                    }]
                },
            };
        }
    };
};
