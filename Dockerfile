FROM denoland/deno:2.1.7

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY deno.json deno.lock package.json ./

RUN deno install

COPY . .

RUN deno cache src/index.ts
RUN deno run -A npm:prisma generate --no-engine

CMD ["task", "start"]