FROM node:18-alpine3.16

# Create app directory
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Environment
ENV CURRENT_CODE=001

# Copy root package.json
COPY --chown=node:node package.json ./
COPY --chown=node:node ./public ./public

# Install package
RUN npm install --production

# Copy app source
COPY --chown=node:node ./.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]