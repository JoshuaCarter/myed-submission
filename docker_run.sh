#!/bin/sh

line="--------------------------------------"
form="%s\n\t\t%s:\n%s\n"

#run php
printf "$form" "$line" "PHP" "$line"
docker run --rm -d -p 80:80 --name jc-php-con jc/php-img:1.0

#run php
printf "$form" "$line" "Node" "$line"
docker run --rm -d -p 81:80 --name jc-node-con jc/node-img:1.0

#run php
printf "$form" "$line" "Go" "$line"
docker run --rm -d -p 82:80 --name jc-go-con jc/go-img:1.0

#quit on user input
echo ""
read -n 1 -s -r -p "Press any key to quit"