FROM node: 18.16.0

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]