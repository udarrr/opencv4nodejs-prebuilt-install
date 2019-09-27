#!/bin/sh
cd ../../ &&\
npm install --unsafe-perm &&\
cd test
npm install && npm test
cd -
npm run prebuild
