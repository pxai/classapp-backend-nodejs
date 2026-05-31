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

In Docker, the server runs with hot reload (`nodemon`): edits under `src/` restart the API automatically.

To run with hot reload outside Docker:

```bash
npm run dev
```

For production-style runs without reload, use `npm start`.

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

Tests use a separate database (`classapp_test`). Before the suite runs, Jest creates that database if needed, applies the same migrations as dev, and loads the same seed files from `db/seeds/`. Your dev database (`classapp`) is not touched.

Inside the Node container (MySQL must be running):

```bash
docker compose exec node npm test
```

Locally against Docker MySQL on port 3306:

```bash
npm ci
MYSQL_HOST=localhost npm test
```

To seed the test database manually (same SQL as dev):

```bash
docker compose exec -e NODE_ENV=test node npm run seed
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
