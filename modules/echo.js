const statsd = require("../lib/statsd");

exports.handle = function(sender, pieces, storageFactory, callback) {
  statsd.increment("pair_programming.foo.bar");
  callback({ message: pieces.join(" ") });
};
