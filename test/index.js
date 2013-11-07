var expect = require('expect.js');
var consumer = require('../')({ queue: 'foo', interval: 1000});

describe('Consumer', function() {
  it('should have consume method', function() {
    expect(consumer.consume).to.be.a('function');
  });
  it('should call consume when a job is found', function(done) {
    consumer.consume(function(job, complete, log) {
      console.log(job);
      expect(job).to.be.an('object');
      expect(complete).to.be.a('function');
      complete(null, job.id);
      done();
    });
  });
})
