FROM mhart/alpine-node
COPY src/server/index.js .
EXPOSE 8000
CMD node index.js
