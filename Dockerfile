FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# .env 파일이 필요한데, 코드에서 절대 경로를 사용 중이므로 수정 필요
# 일단 .env 파일은 ConfigMap으로 관리할 예정
# COPY .env .env

EXPOSE 9000
CMD ["node", "dist/main.js"]