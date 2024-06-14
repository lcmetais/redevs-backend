FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate 

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]