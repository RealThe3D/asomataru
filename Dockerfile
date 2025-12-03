FROM denoland/deno:2.5.6

WORKDIR /app

COPY deno.json package.json ./

RUN deno install

COPY . .

CMD ["task", "start"]