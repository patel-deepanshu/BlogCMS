# Deployment (production) with Docker Compose

This project contains a `docker-compose.yml` at the repository root which defines three services for production:

- `mongo` - official MongoDB image (data persisted in a named volume)
- `server` - your Node/Express backend built from `server/Dockerfile`
- `client` - your frontend built and served by nginx, using `client/dockerfile`

Prerequisites
- Docker and Docker Compose installed on the target host
- Copy `.env.example` to `.env` at the repo root and fill with production values

Quick start (on the server)

1. Clone repo and copy env file

```powershell
git clone <your-repo-url>
cd "bloger CMS"
cp .env.example .env
# edit .env and set strong passwords and secrets
```

2. Start services

```powershell
docker compose up -d --build
```

3. Check logs

```powershell
docker compose logs -f server
```

Production notes
- The `server` service expects `MONGO_URL` to point to the `mongo` service when using the bundled compose. The default in `.env.example` uses `mongo` as hostname.
- Change `CLIENT_URL` to the public URL where the frontend will be served. If you sit behind a reverse proxy (NGINX, Traefik), bind ports appropriately and consider using TLS with certbot or your cloud provider.
- Rotate `JWT_SECRET` and avoid setting default admin credentials in `.env` for production.

GitHub Actions CI/CD (high-level)

1. CI job: run linters and tests for both `client` and `server` (if present).
2. Build job: build Docker images for `client` and `server` and push to a registry (GHCR or Docker Hub).
3. Deploy job: SSH to target host and run `docker compose pull && docker compose up -d --remove-orphans` or use your orchestration.

Secrets to add to GitHub repository settings (if using GHCR + SSH deploy):
- `GHCR_TOKEN` (or use built-in `GITHUB_TOKEN` for public repos)
- `SSH_PRIVATE_KEY` - private key for deploy user
- `DEPLOY_HOST` - hostname or IP of server
- `DEPLOY_USER` - ssh user on the server

Example workflow snippet (build & push images)

See `.github/workflows/cd.yml` for a suggested pipeline. The workflow should:
- checkout the code
- set up Node for client build step
- build client production assets
- build and push images using `docker/build-push-action`
- optionally SSH to your server and restart the stack
