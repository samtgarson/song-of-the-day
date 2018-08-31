FROM node:10.9.0-alpine

ENV NODE_ENV production
ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

RUN apk update \
  && apk add git

COPY package.json yarn.lock ./
RUN yarn

COPY nuxt.config.js ./
COPY src/ ./src/
COPY .nuxt/ ./.nuxt/

ENV HOST 0.0.0.0
ENV PORT 3000

CMD ["npm", "run", "start"] 
