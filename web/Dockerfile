FROM node:16 as builder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production

FROM nginx:latest

COPY --from=builder ./build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
