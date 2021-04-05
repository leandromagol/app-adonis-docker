FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json yarn.* ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN yarn --production

USER node

COPY init.sh /home/node/app

EXPOSE 3333

ENTRYPOINT ["node","ace","serve","--watch"]

CMD [ "node ace migration:run --force" ] 

