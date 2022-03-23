FROM node

WORKDIR /app

EXPOSE 8080

RUN npm install -g prisma

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./
COPY ./prisma ./prisma
COPY .env ./

RUN npm install

COPY ./src ./src

CMD ["npm", "run", "start:dev"]

# RUN npm run build
