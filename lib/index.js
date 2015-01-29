'use strict';

var pkg = require('../package.json');
var TPL = require('test_private_library');

exports.register = function (server, options, next) {

    var data = 'Just some data for testing';

    server.route({
        method: 'GET',
        path: '/status',
        handler: function (request, reply) {
            var status = {
                date: new Date().toISOString(),
                plugin: {
                    version: pkg.version,
                    name: pkg.name,
                    data: data
                },
                privateLib: TPL.getLibInfo()
            };

            reply(status);
        }
    });

    next();
};

exports.register.attributes = {
    pkg: pkg
};

