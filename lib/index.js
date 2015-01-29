'use strict';

var pkg = require('../package.json');

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
                }
            };

            reply(status);
        }
    });

    next();
};

exports.register.attributes = {
    pkg: pkg
};

