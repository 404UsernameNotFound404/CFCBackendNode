FROM node:10

WORKDIR /src/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 4000

CMD ["npm","start"]