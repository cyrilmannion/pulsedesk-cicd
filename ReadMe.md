# PulseDesk CI/CD Pipeline

![CI](https://github.com/cyrilmannion/pulsedesk-cicd/actions/workflows/ci.yml/badge.svg)

A fully automated CI/CD pipeline for the **PulseDesk** B2B SaaS helpdesk platform, built as part of the B8IT122 Cloud Infrastructure & Virtualisation module at Dublin Business School.

---

## Overview

This project implements an end-to-end CI/CD pipeline that replaces PulseDesk's manual SSH deployment process with a fully automated build, test, and deployment workflow.

| Component | Technology |
|---|---|
| Version Control | GitHub (branching: `feature` → `dev` → `staging` → `main`) |
| CI/CD Orchestration | GitHub Actions |
| Unit Testing | Jest + Supertest |
| API Testing | Postman / Newman |
| Frontend Build | Next.js (`next build`) |
| Artefact Storage | Amazon S3 |
| Deployment | AWS CodeDeploy (rolling — `OneAtATime`) |
| Staging Environment | Amazon EC2 (Amazon Linux 2023) |
| Process Manager | PM2 |

---

## Architecture

```
Developer → GitHub (staging branch)
               │
               ▼
       GitHub Actions (CI)
       ├── Jest unit tests
       ├── Newman API tests (/health)
       └── Next.js build (next build)
               │
               ▼
         app.zip → Amazon S3
               │
               ▼
       AWS CodeDeploy
       └── EC2 Staging Instance
           ├── BeforeInstall  → stop PM2 processes
           ├── AfterInstall   → install API + client deps
           ├── ApplicationStart → start Express (3000) + Next.js (3001)
           └── ValidateService  → curl /health → rollback on failure
```

---

## Project Structure

```
pulsedesk-app/
├── src/
│   └── app.js                  # Express app (routes + /health endpoint)
├── server.js                   # Express entry point (port 3000)
├── client/
│   ├── pages/
│   │   └── index.js            # Next.js dashboard page (port 3001)
│   ├── next.config.js
│   └── package.json
├── tests/
│   └── app.test.js             # Jest unit tests
├── postman/
│   ├── health-check.json       # Newman API test collection
│   └── staging-environment.json
├── scripts/                    # AWS CodeDeploy lifecycle scripts
│   ├── before_install.sh       # Stop existing PM2 processes
│   ├── install_dependencies.sh # Install Node.js, API deps, client deps
│   ├── start_server.sh         # Start Express + Next.js via PM2
│   └── health_check.sh         # Validate /health endpoint
├── appspec.yml                 # AWS CodeDeploy configuration
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions workflow
└── package.json
```

---

## CI/CD Pipeline

### Trigger
The pipeline triggers automatically on:
- `push` to `main`, `dev`, `staging`, or `feature/**`
- `pull_request` targeting `main`, `dev`, or `staging`

### CI Job (all branches)
1. Checkout repository
2. Set up Node.js 20
3. Install API dependencies (`npm ci`)
4. Run Jest unit tests (`npm test`)
5. Run Newman API tests against `/health`
6. Install Next.js client dependencies (`npm ci --prefix client`)
7. Build Next.js frontend (`npm run build --prefix client`)

### CD Job (staging branch only, after CI passes)
1. Rebuild Next.js client
2. Package application as `app.zip` (excludes `node_modules`, `client/node_modules`, `.git`)
3. Upload `app.zip` to Amazon S3
4. Create AWS CodeDeploy deployment with **automatic rollback on failure**

---

## AWS CodeDeploy Lifecycle

| Hook | Script | Action |
|---|---|---|
| BeforeInstall | `before_install.sh` | Stops `pulsedesk-app` and `pulsedesk-client` PM2 processes |
| AfterInstall | `install_dependencies.sh` | Installs Node.js 22, API deps, Next.js client deps |
| ApplicationStart | `start_server.sh` | Starts Express (port 3000) and Next.js (port 3001) via PM2 |
| ValidateService | `health_check.sh` | `curl -f http://localhost:3000/health` — fails deployment if unhealthy |

**Rollback:** Configured via `--auto-rollback-configuration enabled=true,events=DEPLOYMENT_FAILURE`. If `ValidateService` fails, CodeDeploy automatically redeploys the last known-good revision.

---

## Running Locally

### Express API
```bash
npm install
npm start          # http://localhost:3000
npm test           # Run Jest tests
```

### Next.js Frontend
```bash
cd client
npm install
npm run dev        # http://localhost:3001
```

---

## Environment Variables & Secrets

The following GitHub Actions secrets must be configured in the repository:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY` | IAM user access key for deployment |
| `AWS_SECRET_KEY` | IAM user secret key for deployment |

The EC2 instance must have an IAM instance profile attached with permissions for CodeDeploy and S3.

---

## Endpoints

| Endpoint | Port | Description |
|---|---|---|
| `GET /` | 3000 | Express API root |
| `GET /health` | 3000 | Health check — returns `OK` (used by CodeDeploy ValidateService) |
| `GET /` | 3001 | Next.js PulseDesk dashboard |

---

## Security Group (EC2 Staging)

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 22 | TCP | Developer IP only | SSH access |
| 3000 | TCP | 0.0.0.0/0 | Express API |
| 3001 | TCP | 0.0.0.0/0 | Next.js frontend |
| 80 | TCP | 0.0.0.0/0 | HTTP |

---

## Branching Strategy

```
feature/*  →  dev  →  staging  →  main
                          │
                    Auto-deploys to
                    EC2 staging via
                    CodeDeploy
```

- **feature/*** — isolated development work
- **dev** — integration branch
- **staging** — triggers CodeDeploy deployment to EC2
- **main** — stable, production-ready branch

---

## Module
**B8IT122 — Cloud Infrastructure & Virtualisation**
Dublin Business School | Student: Cyril Mannion | Student No: 20058650
