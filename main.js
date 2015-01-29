'use strict';

var Hapi = require('hapi');
var plugin = require('test_private_hapi_plugin');

var server = new Hapi.Server();
var port = process.env.PORT || 3000
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('/index.html');
    }
});

server.register({register: plugin}, function (err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});