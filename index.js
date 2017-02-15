var Promise = require("bluebird");
var extend = require("util")._extend;

module.exports.hello = function(event, context, cb) {
    var p = new Promise(function(resolve, reject) {
        setTimeout(
            function(callingContext) {
                console.log(["finishing promise", callingContext]);
                console.trace();
                resolve();
            },
            event.timeout, extend(context.invokeid));
    });
    p.then(function(foo) {
        console.log("cb happy");
        cb(null, "cb happy");
    });
};
