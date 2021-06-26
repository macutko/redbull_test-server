FROM  node:15-alpine  as base
WORKDIR /app
COPY package*.json ./

RUN npm install \
    && apk add openssl \
    && mkdir ./certs

COPY . /app

FROM base as development
EXPOSE $PORT
ENTRYPOINT ["npm","run","start:local"]
