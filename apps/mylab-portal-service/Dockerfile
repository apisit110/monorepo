ARG NODE_VERSION=18-alpine3.16

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
RUN turbo prune --scope=mylab-portal-service --docker

# Build the project
FROM base AS builder
WORKDIR /app
# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# # see https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/reference.md#run---mounttypecache
# RUN \
#   --mount=type=cache,target=/usr/local/share/.cache/yarn/v6,sharing=locked \
#   yarn --prefer-offline --frozen-lockfile
RUN yarn install

COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=mylab-portal-service
# RUN prune ...
RUN rm -rf ./**/*/src

# Final image
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs
WORKDIR /app
# COPY --from=builder --chown=nodejs:nodejs /app .
# WORKDIR /app/apps/mylab-portal-service
COPY --from=builder --chown=nodejs:nodejs /app/apps/mylab-portal-service .

ARG PORT=3001
ENV PORTAL_SERVICE_PORT=${PORT}
EXPOSE ${PORT}

CMD yarn start

# docker build -t mylab-portal-service:0.0.1 -f apps/mylab-portal-service/Dockerfile .
# docker run --rm -d --name mylab-portal-service -p 3001:3001 mylab-portal-service:0.0.1
# docker run --rm -it --name mylab-portal-service -p 3001:3001 mylab-portal-service:0.0.1 sh
# docker logs -f mylab-portal-service
# docker rm -f mylab-portal-service