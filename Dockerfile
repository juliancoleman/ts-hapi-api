# TS Hapi API Dockerfile
#
# For more information on how to modify this file and all
# available directives, visit the link below:
# https://docs.docker.com/engine/reference/builder/

# Node chosen for its immediate access to NodeJS; ships
# with the yarn package manager and Aptitude
# https://yarnpkg.com/en/
ARG VERSION=10
FROM node:${VERSION}

# Super meta
LABEL author="Julian Coleman"
LABEL appName="ts-hapi-api"
LABEL appVersion="0.0.1"

# Install Dockerize - we use this to attempt to
# re-establish a connection to the database in case of a
# possible connection failure.
# https://github.com/jwilder/dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN useradd docker

# Copy all files (that aren't ignored by .dockerignore) to
# our `home` directory and install all project dependencies
WORKDIR /home
COPY . .
RUN yarn --pure-lockfile
RUN yarn build

# Init project env variables and expose app port; NODE_ENV
# is set to `production` here. Use `yarn dev` locally for
# development; only use Docker for deploying the
# application.
ENV NODE_ENV=production
ENV PORT=8912

EXPOSE 8912

CMD yarn start
