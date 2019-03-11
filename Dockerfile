FROM node:lts-alpine
ENV PORT=80
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start"]
