#!/usr/bin/bash
pkgin -y update
pkgin -y install scmgit gmake gcc47
git submodule update --init --recursive
./init.sh

cd bud && git clone https://chromium.googlesource.com/external/gyp.git tools/gyp && ./gyp_bud -Dtarget_arch=x64 && make -C out/ -j16 && cd -
cd stud && make && cd -

cat bud/keys/cert.pem > stud.pem
cat bud/keys/key.pem >> stud.pem

nohup node server.js &
nohup ./bud/out/Release/bud --conf bud.conf > /dev/null &
nohup ./stud/stud --conf stud.conf -q > /dev/null &
