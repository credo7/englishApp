FROM node

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start"]

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./public ./public
COPY ./src ./src

# RUN npm run build
