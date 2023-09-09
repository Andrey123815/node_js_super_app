#!/bin/bash

tsc
#node dist/main.js --port 8081 &
#node dist/main.js --port 8082 &
#node dist/main.js --port 8083 &
#node dist/main.js --port 8084

array=(8081 8082 8083 8084)

for var in ${array[*]}
do
  node dist/main.js --port "$var" &
done
