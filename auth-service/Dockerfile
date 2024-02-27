# Build stage
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD ["sh", "scripts/start_service.sh"]
