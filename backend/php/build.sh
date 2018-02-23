#!/bin/sh

#get absolute dir of this file
parent_path=$(cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P)
#cd into it
cd "$parent_path"
#build image
docker build -t jc/php-img:1.0 .