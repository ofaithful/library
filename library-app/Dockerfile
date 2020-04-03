FROM alpine:3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run migrate_up_all && yarn run dev