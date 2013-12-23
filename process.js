var assert = require('assert');
var fs = require('fs');

var results = fs.readFileSync('./results.txt').toString();

results = results.split(
  'This is ApacheBench, Version 2.3 <$Revision: 1430300 $>\n' +
  'Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/\n' +
  'Licensed to The Apache Software Foundation, http://www.apache.org/\n\n' +
  'Benchmarking 10.100.58.176 (be patient).....done\n\n\n'
);

// Skip first empty
results.shift();

results = results.map(function(result) {
  var lines = result.split('\n').filter(function(line) {
    return line;
  });

  var out = {};

  lines.forEach(function(line) {
    var match;

    match = line.match(/Server Port:.*?(\d+)/);
    if (match !== null) {
      out.port = match[1] | 0;
      return;
    }

    match = line.match(/Concurrency Level:.*?(\d+)/);
    if (match !== null) {
      out.concurrency = match[1] | 0;
      return;
    }

    match = line.match(/Requests per second:.*?(\d+(?:.\d+)?)/);
    if (match !== null) {
      out.rps = parseFloat(match[1]);
      return;
    }

    match = line.match(/95%.*?(\d+)/);
    if (match !== null) {
      out['95p'] = match[1] | 0;
      return;
    }

    match = line.match(/99%.*?(\d+)/);
    if (match !== null) {
      out['99p'] = match[1] | 0;
      return;
    }
  });

  return out;
});

var bud = [];
var stud = [];

results.forEach(function(result) {
  if (result.port === 1443)
    bud.push(result);
  else
    stud.push(result);
});

var pairs = bud.map(function(result, i) {
  assert.equal(result.concurrency, stud[i].concurrency);
  return { c: result.concurrency, bud: result, stud: stud[i] };
});

console.log('c, bud-rps, stud-rps');
pairs.forEach(function(pair) {
  console.log('%d, %d, %d', pair.c, pair.bud.rps, pair.stud.rps);
});

console.log('c, bud-99p, bud-95p, stud-99p, stud-95p');
pairs.forEach(function(pair) {
  console.log('%d, %d, %d', pair.c,
              pair.bud['99p'], pair.bud['95p'],
              pair.stud['99p'], pair.stud['95p']);
});
