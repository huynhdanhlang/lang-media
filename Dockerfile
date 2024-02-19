FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

CMD ["npm", "run", "start", "backend"]