# Use node como base
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build do Next.js
RUN npm run build

# Expõe a porta que o Next roda
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "start"]
