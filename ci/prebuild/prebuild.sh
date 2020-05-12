#!/bin/bash

TARGET=$1
RUNTIME=$2

TARGET="${TARGET:-$TRAVIS_NODE_VERSION.0.0}"
RUNTIME="${RUNTIME:-node}"

echo "Prebuild target: ${TARGET}"
echo "Prebuild runtime: ${RUNTIME}"

cd ../../ &&\
npm install --unsafe-perm &&\
cd test
npm install && npm test
cd -
npm run prebuild -- -t $TARGET -r $RUNTIME --include-regex "\.(node|a|so|dylib|lib|dll).*$" -u $GITHUB_TOKEN;
