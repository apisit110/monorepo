FROM node:18-alpine3.16

# Create app directory
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Environment
ENV CURRENT_CODE=001

# Install app dependencies
COPY --chown=node:node package.json ./

RUN npm install --production

COPY --chown=node:node ./.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]