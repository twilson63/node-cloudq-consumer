// note should look at hyperquest...
var request = require('request');
var _ = require('underscore');
var log = require('./logger');

var DEFAULT_INTERVAL = 5000;

function Consumer(config) {
  // sets config
  this.config = {
    server: 'http://localhost:3000',
    queue: 'default',
    interval: DEFAULT_INTERVAL
  };
  _.extend(this.config, config);
  console.log(this.config);
}

Consumer.prototype.log = log;

Consumer.prototype.consume = function(fn) {
  var self = this; 
  var queueUrl = [self.config.server, self.config.queue].join('/');
  function complete(err, id, cb) {
    if (err) { return log.error(err); }
    if (!id) { return log.error('Id not found!'); }
    // tell cloudq job is process and re-engage
    request.del([queueUrl, id].join('/'), function(e, r, b) {
      if (e) { log.error(e); return; }
      log.info(b); 
      setTimeout(check, self.config.interval);
      cb();
    });
  }

  function check() {
    request.get(queueUrl, { json: true }, function(e,r,b) { 
      console.log(b);
      if (e) { log.error(e); }
      if (b && b.ok) { log.info(b); return fn(b, complete); }
      setTimeout(check, self.config.interval);
    });
  }
  check();
  // check for job via every interval
};

module.exports = function(config) {
  return new Consumer(config);
}
