# 1st BUILD
FROM node:18-alpine3.16 AS builder
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json ./package.json
COPY turbo.json ./turbo.json
COPY packages ./packages
COPY apps/mylab-portal-service ./apps/mylab-portal-service

# 2nd INSTALL
FROM node:18-alpine3.16 AS installer
WORKDIR /home/node/app
COPY --from=builder /home/node/app ./
RUN npm install
RUN npm run build:mylab-portal-service

# 3rd RUN
FROM node:18-alpine3.16 AS runner
WORKDIR /home/node/app
COPY --from=installer /home/node/app ./
# COPY --from=installer /home/node/app/apps/mylab-portal ./
CMD ["npm", "run", "start"]