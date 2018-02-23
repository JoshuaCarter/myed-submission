FROM golang:1.10-alpine
LABEL "Author"="joshua.carter.dev@gmail.com"

# install git (for mux/handlers)
RUN apk add --no-cache git mercurial

# working dir for container
WORKDIR /go/src/app

# copy app src
COPY src/ ./

# get/install app packages
RUN go get -d -v ./...
RUN go install -v ./...

# expose port 80
EXPOSE 80

# run app
CMD ["app"]