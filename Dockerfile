FROM denoland/deno:2.1.6

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY . .

RUN deno install
RUN deno run -A npm:prisma generate --no-engine

CMD ["task", "start"]