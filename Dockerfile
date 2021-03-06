# FROM node:10

# WORKDIR ./

# COPY package.json ./
# COPY tsconfig.json ./

# RUN npm install

# RUN npm run build

# COPY ./dist .

# EXPOSE 4000

# CMD ["npm","start"]

# FROM node:10
# WORKDIR /
# COPY package.json .
# COPY tsconfig.json .
# RUN npm install\
#     && npm install tsc -g
# COPY . .
# RUN tsc -p
# CMD ["node", "./dist/app.js"]

FROM node:10
WORKDIR ./
COPY package.json .
COPY tsconfig.json .
COPY ./dist/ ./dist/
COPY .env /.env
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]