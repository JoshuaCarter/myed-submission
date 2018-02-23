#!/bin/sh

line="--------------------------------------"
form="%s\n\t\t%s:\n%s\n"

#stop php
printf "$form" "$line" "PHP" "$line"
docker stop -t 0 jc-php-con

#stop node
printf "$form" "$line" "Node" "$line"
docker stop -t 0 jc-node-con

#stop go
printf "$form" "$line" "Go" "$line"
docker stop -t 0 jc-go-con

#quit on user input
echo ""
read -n 1 -s -r -p "Press any key to quit"