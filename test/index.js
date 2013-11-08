var expect = require('expect.js');
var consumer = require('../')({ queue: 'foo', interval: 1000});
var nock = require('nock');

nock('http://localhost:3000')
  .get('/foo')
  .reply(200, { "ok": true, "klass": "foo", "args": [], "id": 1 });
nock('http://localhost:3000')
  .delete('/foo/1')
  .reply(200, {"success": true });
describe('Consumer', function() {
  it('should have consume method', function() {
    expect(consumer.consume).to.be.a('function');
  });
  it('should call consume when a job is found', function(done) {
    consumer.consume(function(job, complete, log) {
      console.log(job);
      expect(job).to.be.an('object');
      expect(complete).to.be.a('function');
      complete(null, job.id, function() {
        done();
      });
    });
  });
})
