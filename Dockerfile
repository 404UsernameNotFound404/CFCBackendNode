FROM node:10

WORKDIR ./

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm run build

COPY ./dist .

EXPOSE 4000

CMD ["npm","start"]