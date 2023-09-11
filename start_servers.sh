#!/bin/bash

tsc
APP_SERVER_PORTS=(8081 8082 8083 8084)

arrayLength="${#APP_SERVER_PORTS[@]}"

for serverPort in ${APP_SERVER_PORTS[*]:0:arrayLength-1}
do
  node dist/main.js --port "$serverPort" &
done

node dist/main.js --port "${APP_SERVER_PORTS[arrayLength-1]}"
