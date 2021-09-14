FROM node:14.16.1-alpine3.13

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY . . 
EXPOSE 3003

CMD [ "npm", "bash" ]



