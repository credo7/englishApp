FROM node

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./

RUN npm install

COPY ./src ./src

RUN npm run build