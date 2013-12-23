#!/usr/bin/bash
pkgin -y update
pkgin -y install apache-2.4
./init.sh

nohup ./bench.sh > results.txt &
tail -f results.txt
