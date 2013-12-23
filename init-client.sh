#!/usr/bin/bash
pkgin -y update
pkgin -y install apache-2.4
./init.sh

nohup ./bench.sh $1 $2 > results.txt &
tail -f results.txt
