# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos necessários para instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o Prisma Client antes do build (garante que está atualizado)
RUN npx prisma generate

# Gera o build de produção do Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine AS runner

WORKDIR /app

# Copia apenas o necessário da build para produção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

ENV NODE_ENV=production

EXPOSE 3000

# Executa somente o start da aplicação — prisma generate não precisa rodar em produção
CMD ["npm", "start"]
