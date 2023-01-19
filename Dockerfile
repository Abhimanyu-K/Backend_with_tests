FROM node:18.12.1

RUN mkdir /api
RUN apt update -y && apt upgrade -y

WORKDIR /api
COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]