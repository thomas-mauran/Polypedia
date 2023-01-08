FROM node:11-alpine

USER root

RUN apk add graphicsmagick
RUN apk add ghostscript

RUN mkdir -p /usr/src/app
RUN mkdir -p /files/
RUN chmod -R 777 /files/
RUN mkdir -p /files/pdf
RUN mkdir -p /files/img

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]