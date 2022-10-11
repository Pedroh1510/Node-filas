FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm ci

COPY . . 

USER node

CMD ['npm', 'run', 'server']