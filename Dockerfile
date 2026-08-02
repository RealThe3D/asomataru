FROM denoland/deno:2.9.4

WORKDIR /app

COPY deno.json package*.json ./

RUN deno install

COPY . .

CMD ["task", "start"]