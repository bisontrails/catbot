const StatsD = require("node-statsd");
const statsd = new StatsD({
  host: "10.0.1.13",
  port: 8125
});

module.exports = statsd;
