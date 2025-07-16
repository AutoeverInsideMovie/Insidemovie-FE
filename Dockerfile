FROM node:24-alpine AS build
WORKDIR /movie

COPY . .
RUN npm install

RUN npm run build

FROM nginx:alpine
COPY --from=build /movie/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]