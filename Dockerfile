FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
ENV HTTPS = "true"
ENV SSL_CRT_FILE = "./certificates/server.crt"
ENV SSL_KEY_FILE = "./certificates/key.pem"
CMD ["npm", "start"]
