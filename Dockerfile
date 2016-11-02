#Grab the latest alpine image
# FROM reactioncommerce/base:latest
FROM ubuntu:14.04

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN curl https://install.meteor.com/ | sh
RUN apt-get install -y \
build-essential \
nodejs \
git \
mongodb-org \
python \
python-dev


# Install python and pip
# RUN apk add --update python py-pip bash
# ADD ./webapp/requirements.txt /tmp/requirements.txt

# Install dependencies
# RUN npm install -g reaction-cli
# RUN git clone https://github.com/andela/project-daini.git /opt/webapp/
COPY . /opt/webapp/
RUN cd /opt/webapp/ && npm install

# Add our code
# ADD ./webapp /opt/webapp/
WORKDIR /opt/webapp

# Expose is NOT supported by Heroku
# EXPOSE 5000

# Run the image as a non-root user
# RUN adduser -D myuser
# USER myuser

RUN cp /usr/local/bin/meteor /opt/webapp/.meteor/
# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku
# CMD gunicorn --bind 0.0.0.0:$PORT wsgi
CMD meteor


# Default environment variables
ENV ROOT_URL "http://localhost"
ENV MONGO_URL "mongodb://127.0.0.1:27017/reaction"
