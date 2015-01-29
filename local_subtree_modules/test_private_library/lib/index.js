'use strict';

var pkg = require('../package.json');

var libData = 'here is some lib data';
exports.getLibInfo = function(){
    return {
        version: pkg.version,
        name: pkg.name,
        libData: libData
    }
};