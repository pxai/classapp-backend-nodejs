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

Stop containers, remove them, and delete named volumes (MySQL data and `node_modules` volume):

```bash
docker compose down -v
```

To also remove pulled images (optional):

```bash
docker compose down -v --rmi local
```
