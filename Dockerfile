FROM node:24-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["node", ".next/standalone/server.js"]