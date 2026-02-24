# Build stage - React client
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server/ ./server/
COPY --from=client-build /app/client/build ./client/build

EXPOSE 3000

ENV NODE_ENV=production
CMD ["node", "server/src/server.js"]
