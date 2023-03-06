FROM node:18-alpine3.16

# Create app directory
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Environment
ENV PORTAL_SERVICE_PORT=3001

# Install app dependencies
COPY --chown=node:node package.json ./

RUN npm install --production

COPY --chown=node:node ./dist ./dist

EXPOSE 3001

CMD ["npm", "run", "start"]