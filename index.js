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
    interval: DEFAULT_INTEVAL
  };
  _.extend(this.config, config);
}

Consumer.prototype.log = log;

Consumer.prototype.consume = function(fn) {
  var self = this; 
  var queueUrl = [self.config.server, self.config.queue].join('/');
  function complete(err, id) {
    if (err) { return log.error(err); }
    if (!id) { return log.error('Id not found!'); }
    // tell cloudq job is process and re-engage
    request.del([queueUrl, id].join('/'), function(e, r, b) {
      if (e) { log.error(e); return; }
      log.info(b); 
      setTimeout(check, self.config.interval);
    });
  }

  function check() {
    request.get(queueUrl, function(e,r,b) { 
      if (e) { log.error(e); return; }
      if (b.ok) { log.info(b); return fn(b, complete); }
      setTimeout(check, self.config.interval);
    });
  }
  // check for job via every interval
  setTimeout(check, self.config.interval);
};

module.exports = function(config) {
  return new Consumer(config);
}