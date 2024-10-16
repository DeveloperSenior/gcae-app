FROM node:20

RUN mkdir ~/.aws && touch ~/.aws/credentials

# Inject AWS credentials as environment variables
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG BUCKET_TEMPLATE
ARG AWS_SECRET_ACCESS_KEY
ARG NODE_TEMPLATE_PROJECT
ARG NODE_TEMPLATES

ENV VERSION 1.0
ENV PORT 3000
ENV API_PATH /api/v1
ENV ENV dllo
ENV APP_SUPPORT MONGO,POSTGRES
ENV TYPES_SUPPORT String,Object,Array,Number,Date,Relationship

# FileSystem
ENV BASE_PATH /tmp/gcae

# S3 config
ENV BUCKET_TEMPLATE $BUCKET_TEMPLATE
ENV NODE_TEMPLATE_PROJECT $NODE_TEMPLATE_PROJECT
ENV NODE_TEMPLATES $NODE_TEMPLATES
ENV BUCKET_FOLDER_APPS apps

# Node cache
# TTL 24h
ENV CACHE_TTL 86400

ENV DB_HOST discoverappcluster0.224hpiv.mongodb.net
ENV DB_NAME gcae-app
ENV DB_USER gcaeapp
ENV DB_TOKEN SkZBZHYwOTlFc0VXckY5dg==
ENV DB_PROTOCOL mongodb+srv

# JWT config

ENV JWT_SECRET_KEY SkZBZHYwOTlFc0VXckY5dg==
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

EXPOSE 3000

CMD ["npm","run","star"]

