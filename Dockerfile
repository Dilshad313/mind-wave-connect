# Stage 1: Build the frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
COPY package-lock.json .
COPY src/server ./src/server
RUN npm install --omit=dev
EXPOSE 5000
CMD ["node", "src/server/server.js"]
