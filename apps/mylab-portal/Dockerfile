FROM node:18-alpine AS base
 
FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope mylab-portal --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app

 # First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=mylab-portal

FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app .
WORKDIR /app/apps/mylab-portal
CMD ["yarn", "start"]

# docker build -t mylab-portal:0.0.1 -f apps/mylab-portal/Dockerfile .
# docker run --rm -it mylab-portal:0.0.1 sh
# docker run --rm -d -p 3000:3000 mylab-portal:0.0.1