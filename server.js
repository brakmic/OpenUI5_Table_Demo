var Path = require('path');
var Hapi = require('hapi');
var config = require('./Scripts/server.config.js');
var good = require('good');
var server = new Hapi.Server();
server.connection({ port: config.http.port});
var internals = {};

server.route({
    method: 'GET',
    path: '/Content/{param*}',
    handler:{
        directory: {
            path: './content',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/Config/{param*}',
    handler: {
        directory: {
            path: './config',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/Fonts/{param*}',
    handler:{
        directory: {
            path: './fonts',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/Scripts/{param*}',
    handler:{
        directory: {
            path: './scripts',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/UI/{param*}',
    handler: {
        directory: {
            path: './UI',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function(request, reply){
        reply.file('favicon.ico');
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: function(request, reply){
        reply.file('index.html').header('Content-Type','text/html');
    }
});

// set clientconfig cookie
internals.configStateConfig = {
    encoding: 'none',
    ttl: 1000 * 60 * 15,
    isSecure: config.isSecure
};

server.state('config', internals.configStateConfig);

server.register({
    register: good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
