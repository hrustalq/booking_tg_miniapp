FROM node:18-alpine AS base

FROM node:18-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
RUN npm install -g serve
COPY . .
# Only Take packages that are needed to compile this app
RUN turbo prune web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/turbo.json ./turbo.json
RUN npm install --frozen-lockfile

FROM node:18-alpine AS sourcer
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN npx turbo run build --filter web

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=sourcer /app/ .

CMD ["npx", "serve", "-s", "apps/web/dist", "-l", "80"]