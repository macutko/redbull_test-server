FROM  node:15-alpine  as base
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . /app

FROM base as development
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["npm","run","start:local"]
