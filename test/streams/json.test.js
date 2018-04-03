const jsonStream = require('src/streams/json');
const {Writable, Readable} = require('stream');

describe(jsonStream.name, function() {
  it('should map object stream into POJSO stream', function(done) {
    const key = 'testing-key';
    const stream = jsonStream(key);
    const readable = new Readable({objectMode: true});
    const serializable = {test: true};
    const testingObject = {
      [key]: JSON.stringify(serializable),
    };
    let result;
    const testingStream = new Writable({
      objectMode: true,
      write(chunk, enc, next) {
        result = chunk;
        next();
      },
    });
    readable.push(testingObject);
    readable.push(null);
    readable.pipe(stream).pipe(testingStream).on('finish', () => {
      result.should.be.deep.equal(serializable);
      done();
    });
  });
});
