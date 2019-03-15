FROM node:lts-alpine
ENV PORT 80
EXPOSE 80

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]
