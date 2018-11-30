FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache --virtual build-dependencies make gcc g++ python 
RUN yarn global add node-gyp

#复制代码
##先 COPY package.json 的目的是, 后期代码变动重新打包会使用 Cache, 提高 build 速率
ADD config /usr/src/app/config
ADD dict /usr/src/app/dict
ADD src /usr/src/app/src
ADD util /usr/src/app/util
ADD package.json /usr/src/app/
ADD yarn.lock /usr/src/app/
ADD index.js /usr/src/app/
RUN yarn

ENV TZ Asia/Shanghai
ENV TERM linux
ENV LANG en_US.utf8

EXPOSE 80

CMD ["node", "index.js"]
