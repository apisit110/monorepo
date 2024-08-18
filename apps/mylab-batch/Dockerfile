ARG NODE_VERSION=20.16-alpine3.19

# Alpine image
FROM node:${NODE_VERSION} AS alpine
RUN apk add --no-cache libc6-compat
RUN apk update

# Setup turbo on the alpine base
FROM alpine AS base
RUN npm install -g turbo

# Prune projects
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=mylab-batch --docker

# Build the project
FROM base AS builder
RUN npm install -g pnpm

WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=mylab-batch
RUN pnpm deploy --filter=mylab-batch --prod /home/node/mylab-batch

# Final image
FROM base AS runner
COPY --from=builder /home/node/mylab-batch /app
WORKDIR /app

ARG PORT=3001
ENV PORTAL_SERVICE_PORT=${PORT}
EXPOSE ${PORT}
CMD ["npm", "run", "start"]

# docker build -t mylab-batch:0.0.1 -f apps/mylab-batch/Dockerfile .
# docker run --rm -d --name mylab-batch -p 3001:3001 mylab-batch:0.0.1
# docker run --rm -it --name mylab-batch -p 3001:3001 mylab-batch:0.0.1 sh
# docker logs -f mylab-batch
# docker rm -f mylab-batch