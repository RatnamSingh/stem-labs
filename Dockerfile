
# Stage 1: Build the React application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve production files with Nginx
FROM nginx:1.28-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
