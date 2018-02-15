const StatsD = require("node-statsd");
exports.statsd = new StatsD({
  host: "10.0.1.13",
  port: 8125
});
