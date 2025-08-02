FROM node:20.5.0

WORKDIR /app
COPY . . 

RUN npm run build

CMD ["npm", "run", "start"]