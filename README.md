# ClassApp Backend

Minimal Express 5 API with Docker Compose (Node.js + MySQL).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

## Build and run

Start MySQL and the Node container (installs npm dependencies, runs the API, and opens an interactive shell):

```bash
docker compose up
```

Run detached in the background:

```bash
docker compose up -d
```

The API is available at http://localhost:3000 (`Hello World`).

### Run migrations

After the stack is up and MySQL is healthy, apply pending SQL migrations (required on first run and whenever new files are added under `db/migrations/`):

```bash
docker compose exec node npm run migrate
```

If you see `Cannot find module 'mysql2'`, install dependencies in the container first:

```bash
docker compose exec node npm ci
```

Locally (with Node installed and MySQL reachable; set `MYSQL_*` env vars or use Docker’s values with `MYSQL_HOST=localhost`):

```bash
npm ci
npm run migrate
```

### Run seeds

After migrations, load sample data from `db/seeds/`:

```bash
docker compose exec node npm run seed
```

Locally (with `MYSQL_*` env vars set):

```bash
npm run seed
```

Re-running seeds will insert duplicate rows unless you reset the database.

### Shell in the Node container

Attach to the running container’s shell:

```bash
docker compose attach node
```

Or open a new shell session:

```bash
docker compose exec node sh
```

### Run tests

Inside the Node container:

```bash
docker compose exec node npm test
```

Locally (with Node installed):

```bash
npm install
npm test
```

## Purge everything

Stop containers, remove them, and delete named volumes (MySQL data):

```bash
docker compose down -v
```

To also remove pulled images (optional):

```bash
docker compose down -v --rmi local
```
