FROM php:7.0-apache
LABEL "Author"="joshua.carter.dev@gmail.com"

# copy php.ini
COPY config/php.ini /usr/local/etc/php/

# copy src into apache
COPY src/ /var/www/html/