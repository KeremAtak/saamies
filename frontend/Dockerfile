FROM node:11.0.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]