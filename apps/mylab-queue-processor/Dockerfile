ARG NODE_VERSION=20.16-alpine3.19

# Alpine image
FROM node:${NODE_VERSION} AS alpine
RUN apk add --no-cache libc6-compat
RUN apk update

# Setup turbo on the alpine base
FROM alpine AS base
RUN yarn global add turbo

# Prune projects
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=mylab-queue-processor --docker

# Build the project
FROM base AS builder
RUN npm install -g pnpm

WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=mylab-queue-processor
RUN pnpm deploy --filter=mylab-queue-processor --prod /home/node/mylab-queue-processor

# Final image
FROM base AS runner
COPY --from=builder /home/node/mylab-queue-processor /app
WORKDIR /app

# ARG PORT=3001
# ENV PORTAL_SERVICE_PORT=${PORT}
# EXPOSE ${PORT}
CMD ["npm", "start"]

# docker build -t mylab-queue-processor:0.0.1 -f apps/mylab-queue-processor/Dockerfile .
# docker run --rm -d --name mylab-queue-processor -p 3001:3001 mylab-queue-processor:0.0.1
# docker run --rm -it --name mylab-queue-processor -p 3001:3001 mylab-queue-processor:0.0.1 sh
# docker logs -f mylab-queue-processor
# docker rm -f mylab-queue-processor

# docker run --rm --env-file ./packages/libs/.env -it --name mylab-queue-processor -p 3001:3001 mylab-queue-processor:0.0.1 sh