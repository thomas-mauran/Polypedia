# FROM node:carbon-slim
# # vue-cli reqires 8.10.0+ 

# RUN apt-get -y update \
#   && apt-get install -y git

# RUN npm install -g @vue/cli

# WORKDIR /src
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8080

# USER node

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