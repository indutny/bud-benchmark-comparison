#!/usr/bin/bash

function bench {
  ab -q -f tls1 -Z AES256-SHA -c $2 -n 10000 https://$1:$3/$4  2>/dev/null
}

for ((i=10;i<=200;i+=1)) {
  bench $1 $i 1443 $2
}

for ((i=10;i<=200;i+=1)) {
  bench $1 $i 1444 $2
}
