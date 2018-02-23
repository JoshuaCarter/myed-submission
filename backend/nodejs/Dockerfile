FROM node:carbon
LABEL "Author"="joshua.carter.dev@gmail.com"

# working dir for container
WORKDIR /usr/src/app

# copy and install app dependencies first so that the docker cache can be used for node_modules and will only re-run `npm install` if the package files change.
COPY src/package*.json ./
RUN npm install

# now copy all other src files (the .dockerignore file stops modules from being copied)
COPY src/ .

# expose port and serve app
EXPOSE 80
CMD ["npm", "start"]