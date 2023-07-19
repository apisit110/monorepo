FROM node:18-alpine3.16 AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
# RUN yarn global add turbo
RUN npm i -g turbo
COPY . .
# COPY turbo.json turbo.json
# COPY package*.json .
# COPY packages packages
# COPY apps/mylab-portal-service apps/mylab-portal-service
RUN turbo prune --scope=mylab-portal-service --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine3.16 AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Environment
ENV PORTAL_SERVICE_PORT=3001

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=mylab-portal-service...

FROM node:18-alpine3.16 AS runner
WORKDIR /app

COPY --from=installer /app .
WORKDIR /app/apps/mylab-portal-service

CMD ["npm", "run", "start"]