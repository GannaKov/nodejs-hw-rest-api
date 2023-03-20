FROM node
WORKDIR /app
COPY package*.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "node", "./server.js" ]
# CMD ["cross-env", "NODE_ENV=production", "node", "./server.js"]
# ENV NODE_ENV=production
# CMD [ "node", "./server.js" ]
# CMD ["npm", "start"]
# RUN npm install --production
# COPY package.json /app
# RUN npm install 
# COPY . .