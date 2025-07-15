# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o Prisma Client antes do build (garante que está atualizado)
RUN npx prisma generate

# Gera o build de produção
RUN npm run build

# Etapa 2: Produção
# Etapa 2: Produção
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma  # <-- Linha adicionada

ENV NODE_ENV=production

EXPOSE 3000

CMD npx prisma generate && npx prisma migrate deploy && npm start

