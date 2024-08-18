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
RUN turbo prune --scope=mylab-portal --docker

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
RUN turbo build --filter=mylab-portal
RUN pnpm deploy --filter=mylab-portal --prod /home/node/mylab-portal

# Final image
FROM base AS runner
COPY --from=builder /home/node/mylab-portal /app
WORKDIR /app

ARG PORT=3000
# ENV PORTAL_SERVICE_PORT=${PORT}
EXPOSE ${PORT}
CMD ["npm", "run", "start"]

# docker build -t mylab-portal:0.0.1 -f apps/mylab-portal/Dockerfile .
# docker run --rm -d --name mylab-portal -p 3000:3000 mylab-portal:0.0.1
# docker run --rm -it --name mylab-portal -p 3000:3000 mylab-portal:0.0.1 sh
# docker logs -f mylab-portal
# docker rm -f mylab-portal