FROM node:13

WORKDIR /usr/src/ui

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "start"]