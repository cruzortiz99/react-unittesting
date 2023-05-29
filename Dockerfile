FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

COPY ./ /app

RUN ["yarn"]

CMD ["yarn", "start"]