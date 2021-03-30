FROM node:10-alpine as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci

FROM node:10-alpine

RUN npm install pm2 nodemon concurrently sass -g

RUN npm install

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["pm2-runtime", "src/index.js"]
