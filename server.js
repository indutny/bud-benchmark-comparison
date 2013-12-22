var http = require('http');

var big = new Buffer(128 * 1024);
big.fill('A');

http.createServer(function(req, res) {
  if (req.url === '/big')
    res.end(big);
  else
    res.end('hello world');
}).listen(8000);
