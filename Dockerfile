FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
copy .env ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 4000

CMD ["npm","start"]