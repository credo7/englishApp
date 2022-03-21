FROM node

WORKDIR /app

EXPOSE 3000

RUN npm install -g prisma

# RUN npx prisma

# RUN npx prisma init

CMD ["npm", "run", "start:dev"]

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./
COPY ./prisma ./prisma

RUN prisma generate

RUN npm install

COPY ./src ./src

RUN npm run build