#!/bin/sh

line="--------------------------------------"
form="%s\n\t\t%s:\n%s\n"

#build script for php
printf "$form" "$line" "PHP" "$line"
./backend/php/build.sh

#build script for nodejs
printf "$form" "$line" "Node" "$line"
./backend/nodejs/build.sh

#build script for go
printf "$form" "$line" "Go" "$line"
./backend/go/build.sh

#quit on user input
echo ""
read -n 1 -s -r -p "Press any key to quit"