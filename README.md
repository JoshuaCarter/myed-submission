# MyEd Developer Submission
###### Joshua Carter
---

## Introduction
This is my new submission to MyEd for a developer position.

As this is my second application to MyEd, I have attempted to iterate on my previous submission (for the coding challenge) in a way that incorporates the feedback I received at that time. In particular I have tried to address the following points:

1) **Limited demonstration of backend skills:**
-- I wanted to demonstrate my ability to operate on the backend by implementing backend technologies that MyEd uses. As such, I have used **Docker** to serve **three** backend implementations; one in **PHP**, one in **Node.js**, and one **Go**. A dropdown box allows you to select which backend the angular application communicates with.
2) **Concerns that my real interest may be games:**
-- Games are what motivated me to get into programming, but the more I learned about the games industry, the more I knew it wasn't for me. What matters to me now is being able to program for a career, and having a good employer. I can't undo my education or teaching experience, but I have made alterations to my resume to avoid giving this impression, and I intend to remake my website without any game related content.

I should note that this was my first time using Docker, Node.js, and Go.

---
## Tools Used
##### Frontend:
- ##### Angular 4 with Typescript
- ##### Bootstrap 4 and [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap)

##### Backend:
- ##### Docker
- ##### Node.js with [Express](https://github.com/expressjs/express)
- ##### Golang with [Mux](https://github.com/gorilla/mux)
- ##### PHP and Apache

Note that all docker images use Alpine linux.

---
## Running the Project
1) Pull this repo down wherever you like.
2) Inside `myed-submission` run the following scripts:
2.1) `docker_build.sh` This will build all 3 docker images.
2.2) `docker_run.sh` This will run all 3 docker containers.
2.3) `install_and_serve.sh` This will run `npm install` on the angular project and serve it.
3) Open a browser and go to [localhost:4200](http://localhost:4200)
4) When done, you may run `docker_stop.sh` to stop and remove all 3 docker containers.

---
Thank you for your time and I welcome any feedback you may have.