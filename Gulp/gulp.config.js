module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';

    var config = {
        less: client + 'styles/styles.less',
        index: client + 'index.html',
        temp: './.tmp/',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        client: client,
        bower: {
            bowerJson: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },
        css: './.tmp/styles.css',
        defaultPort: 7203,
        nodeServer: './src/server/app.js',
        server: server
    };

    config.getWireDepOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};
