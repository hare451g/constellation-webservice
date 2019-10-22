FROM node:10

WORKDIR /webservice

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
