var consumer = require('../');
//var consumer = require('cloudq-consumer');

consumer({
  server: 'http://token:secret@localhost:3000/',
  queue: 'log',
  interval: 2000
}).consume(function(job, complete) {
  console.dir(job);
  complete(null, job.id);
});