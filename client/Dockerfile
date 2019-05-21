FROM node:11.15.0-alpine

WORKDIR /app

COPY . .

RUN npm i \
    && npm run build --prod \
    && ls | grep -v dist | xargs rm -rfv
