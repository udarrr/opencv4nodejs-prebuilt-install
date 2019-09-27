#!/bin/sh
cd ../../ &&\
npm install --unsafe-perm &&\
cd test
npm install && npm test
cd -
npm run prebuild -- --include-regex "\.(node|a|so|dylib|lib|dll).*$" -u $GITHUB_TOKEN;
