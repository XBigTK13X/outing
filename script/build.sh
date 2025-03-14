#! /bin/bash

cd client

npx npm run build

cd ..

rm -rf docs

mkdir docs

cp -r client/build/* ./docs/