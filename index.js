var bleh = [];

for (var i = 0; i < Math.ceil(process.env.MemorySize * process.env.Ratio); i++) {
    // Fill 16% of the memory.
    bleh.push(require('crypto').randomBytes(1000000));
}

module.exports.hello = function(event, context, cb) {
    console.log("starting");
    setTimeout(
        function(callback) {
            console.log("timeout hit");
            console.log("finish");
            callback(null, "finish");
        },
        event.timeout, cb);
};
