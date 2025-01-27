FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 4200

RUN npm run build:prod

CMD ["npm", "run", "start:prod"]
