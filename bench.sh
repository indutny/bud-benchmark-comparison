#!/usr/bin/bash

function bench {
  ab -q -f tls1 -Z AES256-SHA -c $1 -n 10000 https://10.224.6.191:$2/  2>/dev/null
}

echo -----
echo bud
echo -----

for ((i=10;i<=200;i+=1)) {
  bench $i 1443
}

echo -----
echo stud
echo -----

for ((i=10;i<=200;i+=1)) {
  bench $i 1444
}
