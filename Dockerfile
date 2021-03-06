FROM node:14.17.1-alpine as build-deps

#Stage 1

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV NODE_ENV=production
RUN yarn build

#Stage 2

FROM nginx:1.20-alpine
COPY --from=build-deps /usr/src/app/build /var/www
COPY default.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
