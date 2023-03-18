FROM node
COPY . /app
WORKDIR /app
RUN npm install --production
EXPOSE 3000
CMD ["cross-env", "NODE_ENV=production", "node", "./server.js"]
# ENV NODE_ENV=production
# CMD [ "node", "server.js" ]
# CMD ["npm", "start"]