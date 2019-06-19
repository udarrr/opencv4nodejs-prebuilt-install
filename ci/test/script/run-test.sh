#!/bin/sh
echo installing &&\
npm install --unsafe-perm &&\
echo running tests &&\
cd ./test &&\
npm install --unsafe-perm &&\
npm run test-docker &&\
npm run test-externalMemTracking