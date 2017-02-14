var fs = require('fs');
const nowish = Date.now();
var persist;
try {
    persist = fs.readFileSync('/tmp/test');
} catch (err) {
    fs.writeFileSync("/tmp/test", Date.now(), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

module.exports.hello = function(event, context, cb) {
    var init = parseInt(fs.readFileSync('/tmp/test', 'utf8'));
    var sinceStart = Date.now() - init;
    console.log(nowish);
    console.log([init, sinceStart]);
    setTimeout(
        function (context) {
            console.log('Context timeout finishing');
            context.done(null, 'Context timeout finished');
        }, 3000, context);
    context.done(null, 'context handler Done');
};

module.exports.hello_cb = function(event, context, cb) {
    var init = parseInt(fs.readFileSync('/tmp/test', 'utf8'));
    var sinceStart = Date.now() - init;
    console.log(nowish);
    console.log([init, sinceStart]);
    setTimeout(
        function (cb) {
            console.log('callback Timeout Finishing');
            cb(null, 'callback Timeout Done');
        }, 3000, cb);
    cb(null, 'callback Handler Done');
};
