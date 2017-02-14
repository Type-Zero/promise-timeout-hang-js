'use strict';

const Promise = require('bluebird');

module.exports.handler = function(event, context, cb) {
    console.log('hello~~~');

    Promise
        .delay(500)
        .then(() => context.succeed())
        .catch(err => context.fail(err));
};
