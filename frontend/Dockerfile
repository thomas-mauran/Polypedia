# FROM node:lts-alpine
# USER node

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# RUN npm i @vue/cli-service-global
# COPY . .
# RUN npm install
# RUN chmod 777 node_modules/
# EXPOSE 8080
# CMD ["npm", "run", "serve"]


FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist"]