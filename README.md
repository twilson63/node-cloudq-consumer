# CloudQ Consumer

This module is a javascript api wrapper for consuming CloudQ Jobs.

## example

``` js
var consumer = require('cloudq-consumer');

consumer({
  server: 'http://token:secret@localhost:3000/',
  queue: 'foo',
  interval: 2000
}).consume(function(job, complete) {
  ...
  complete(null);
});

```

## api

### constructor

consumer(config)

> config object
>   server - name of the cloudq server (include auth in url)
>   queue - name of the queue to monitor to consume jobs from
>   interval - amount of time in between checks in milliseconds

the constructor returns a consumer instance with the following methods:

* consume

### consume

consume(function(job, complete) {  complete(null, 'success'); });

The consume method get invoked every time a job is found and returned on the queue.

This is where you can handle your worker processing, the consume method takes a function which will be passed two paramters.

  * job - this is the job object being passed from CloudQ
    {
      id: 'XXXXX',
      klass: 'foo',
      args: [....]
    }
  * complete - this is a callback method that takes the following parameters:
    - error - if no error then pass `null`
    - body - in this param you can pass a string or object and it will simply get logged to the stdout logger.

---

## Usage

* Create a new NodeJS Project

``` sh
mkdir [project]
cd [project]
npm init
```

* Install cloudq-consumer module

``` sh
npm install cloudq-consumer --save
```

* Use the example template above to get started.

** Be sure to create a README.md in your project

## Testing

``` sh
npm test
```

## LICENSE

see LICENSE

## Contributions

The api is straight forward and should remain simple, but all contributions are welcome in the form of pull requests.

