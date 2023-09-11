APP_SERVER_PORTS=(8081 8082 8083 8084)

for serverPort in ${APP_SERVER_PORTS[*]}
do
kill "$(lsof -t -sTCP:LISTEN -i:"$serverPort")"
done
