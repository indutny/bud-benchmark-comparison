var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  return;
}

var big = new Buffer(128 * 1024);
big.fill('A');

http.createServer(function(req, res) {
  if (req.url === '/big')
    res.end(big);
  else
    res.end('hello world');
}).listen(8000, function() {
  console.log('node listening');
});
