FROM node:latest

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project

COPY package.json ./

RUN npm install --no-package-lock

COPY . .

CMD [ "npm", "start" ]
