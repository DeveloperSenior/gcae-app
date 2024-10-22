FROM node:20

RUN mkdir ~/.aws && touch ~/.aws/credentials

ARG ENV=dllo
ARG VERSION=@version@-BETA

ENV VERSION $VERSION
ENV PORT @appPort@
ENV API_PATH @appApiPath@
ENV ENV $ENV


# Node cache
# TTL 24h
ENV CACHE_TTL @cacheTTL@

ENV DB_HOST @dbHost@
ENV DB_NAME @dbName@
ENV DB_USER @dbUser@
ENV DB_TOKEN @dbToken@
ENV DB_PROTOCOL @dbProtocol@
ENV DB_PORT @dbPort@

# JWT config

ENV JWT_SECRET_KEY @jwtSecretKey@
ENV JWT_EXPIRES 1d

# AWS config
ENV AWS_REGION us-east-1
ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
ENV NODE_USE_ARN_REGION_ENV_NAME  "AWS_S3_USE_ARN_REGION"

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY . .

EXPOSE @appPort@

CMD ["npm","run","star"]

