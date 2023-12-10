const log_level = {
  INFO    : "INFO    ",
  WARNING : "WARNING ",
  ERROR   : "ERROR   "
};

function log(level, message) {
  let date = new Date();
  console.log(`[${date.toLocaleString()} - ${level}] ${message}`);
}

module.exports = {
  log_level,
  log
};