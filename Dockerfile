FROM node:current-slim
WORKDIR /var/www/duopan
COPY package.json .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
COPY . .