FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .
COPY wait-for-it.sh .

EXPOSE 3000

CMD ["yarn", "run", "dev"]
