FROM node:19

EXPOSE 3001

WORKDIR /app-backend

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]