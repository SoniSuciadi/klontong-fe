FROM node:22-alpine AS runner
WORKDIR /app

RUN npm install -g serve

COPY dist/ ./dist/
COPY package.json .

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]