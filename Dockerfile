FROM node:10.13.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm", "start"]