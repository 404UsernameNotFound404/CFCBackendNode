# FROM node:10

# WORKDIR ./

# COPY package.json ./
# COPY tsconfig.json ./

# RUN npm install

# RUN npm run build

# COPY ./dist .

# EXPOSE 4000

# CMD ["npm","start"]

FROM node:10
WORKDIR /
COPY package.json .
RUN npm install\
    && npm install tsc -g
COPY .
RUN tsc
CMD ["node", "./dist/server.js"]