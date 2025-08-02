
FROM node:18-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./


RUN npm install --omit=dev


FROM base AS runner
WORKDIR /app

ARG SERVICE_NAME


COPY --from=deps /app/node_modules ./node_modules


COPY ./${SERVICE_NAME} .


CMD [ "node", "index.js" ]
