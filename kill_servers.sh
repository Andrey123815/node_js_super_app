array=(8081 8082 8083 8084)

for var in ${array[*]}
do
kill "$(lsof -t -sTCP:LISTEN -i:"$var")"
done
