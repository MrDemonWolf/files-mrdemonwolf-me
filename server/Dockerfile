FROM node:12.18.4-alpine as builder

RUN apk add --no-cache g++ make python

COPY package*.json ./

RUN npm ci

FROM node:12.18.4-alpine

WORKDIR /usr/src/app/

COPY --from=builder node_modules node_modules

COPY . /usr/src/app/

EXPOSE 8080

CMD [ "npm", "start" ]
