# ARG NODE_VERSION=20.16-alpine3.19

# # Alpine image
# FROM node:${NODE_VERSION} AS alpine
# RUN apk add --no-cache libc6-compat
# RUN apk update

FROM golang:alpine3.20 AS builder
WORKDIR /app
COPY apps/mylab-golang-service .
RUN go mod download
RUN go build -o /app/main

FROM debian:buster-slim
COPY --from=builder /app/main /app/main

EXPOSE 8081
CMD [ "/app/main" ]

# docker build -t mylab-golang-service:0.0.1 -f apps/mylab-golang-service/Dockerfile .
# docker run --rm -d -p 8081:8081 --env-file ./packages/libs/.env --name mylab-golang-service mylab-golang-service:0.0.1
# docker run --rm -it -p 8081:8081 --env-file ./packages/libs/.env --name mylab-golang-service mylab-golang-service:0.0.1 bash
# docker logs -f mylab-golang-service
# docker rm -f mylab-golang-service