FROM node:11-alpine

USER root
RUN mkdir -p /usr/src/app

RUN apk add graphicsmagick
RUN apk add ghostscript

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]