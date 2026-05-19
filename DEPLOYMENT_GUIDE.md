# certifixes — Deployment Guide

This guide covers production deployment of certifixes on bare metal, Docker, and Kubernetes. Follow the steps in order for a clean first deployment.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Install Options](#3-install-options)
   - [CLI on Bare Metal](#31-cli-on-bare-metal)
   - [Docker (Recommended)](#32-docker-recommended)
   - [Kubernetes Operator](#33-kubernetes-operator)
4. [Configure certifixes](#4-configure-certifixes)
5. [First Certificate Issuance](#5-first-certificate-issuance)
6. [Enable the Renewal Daemon](#6-enable-the-renewal-daemon)
7. [Configure Alerts](#7-configure-alerts)
8. [Dashboard Setup](#8-dashboard-setup)
9. [Firewall & Networking](#9-firewall--networking)
10. [Verify Everything Works](#10-verify-everything-works)
11. [Monitoring & Ops](#11-monitoring--ops)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Prerequisites

| Requirement | Details |
|---|---|
| OS | Ubuntu 22.04+ / Debian 12+ / RHEL 9+ / Any Linux |
| Node.js | 20 LTS or later |
| Docker | 24+ (if using Docker install) |
| Root / sudo | Required to deploy certs to nginx/Apache |
| Ports open | 80 (HTTP-01 challenge), 443 (TLS-ALPN-01 challenge) |
| DNS API access | Required for DNS-01 challenges (wildcard certs) |

---

## 2. Environment Setup

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
# Required
CERTIFIXES_EMAIL=ops@yourdomain.com

# Alerting (set at least one)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
PAGERDUTY_ROUTING_KEY=your-routing-key

# DNS provider (choose one for DNS-01 challenges)
CF_API_TOKEN=your-cloudflare-api-token
# AWS_ACCESS_KEY_ID=...
# AWS_SECRET_ACCESS_KEY=...

# Dashboard
CERTIFIXES_DASHBOARD_SECRET=$(openssl rand -hex 32)
```

**Never commit `.env` to source control.** It is in `.gitignore`.

---

## 3. Install Options

### 3.1 CLI on Bare Metal

```bash
# Install globally
npm install -g certifixes

# Verify install
certifixes --version

# Initialize config
certifixes init
```

This creates `certifixes.config.yaml` in your current working directory with sensible defaults.

### 3.2 Docker (Recommended)

```bash
docker run -d \
  --name certifixes \
  --restart unless-stopped \
  -p 8080:8080 \
  -v /etc/certifixes:/config \
  -v /etc/letsencrypt:/certs \
  --env-file .env \
  ghcr.io/midnghtsapphire/certifixes:latest
```

Or with Docker Compose:

```yaml
# docker-compose.yml
services:
  certifixes:
    image: ghcr.io/midnghtsapphire/certifixes:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:8080"
    volumes:
      - /etc/certifixes:/config
      - /etc/letsencrypt:/certs
    env_file:
      - .env
```

```bash
docker compose up -d
```

### 3.3 Kubernetes Operator

```bash
# Install the operator
kubectl apply -f https://install.certifixes.io/operator/latest

# Verify operator pod is running
kubectl get pods -n certifixes-system

# Create namespace secret for credentials
kubectl create secret generic certifixes-credentials \
  --from-literal=email=ops@yourdomain.com \
  --from-literal=cf-api-token=your-cloudflare-api-token \
  -n certifixes-system
```

Annotate your Ingress to opt in:

```yaml
metadata:
  annotations:
    certifixes.io/enabled: "true"
    certifixes.io/provider: letsencrypt
    certifixes.io/challenge: dns-01
```

---

## 4. Configure certifixes

Edit `certifixes.config.yaml`:

```yaml
domains:
  - host: yourdomain.com
    email: ${CERTIFIXES_EMAIL}
    provider: letsencrypt
    challenge: http-01
    server: nginx

  - host: "*.yourdomain.com"
    email: ${CERTIFIXES_EMAIL}
    provider: letsencrypt
    challenge: dns-01
    dns_provider: cloudflare

alerts:
  slack_webhook: ${SLACK_WEBHOOK_URL}
  email: ${CERTIFIXES_EMAIL}
  expiry_warning_days: [30, 14, 7, 1]

renewal:
  auto: true
  days_before_expiry: 30
  retry_interval_hours: 6
```

---

## 5. First Certificate Issuance

```bash
# Scan current state
certifixes scan yourdomain.com

# Issue certificate (dry run first)
certifixes issue yourdomain.com --dry-run

# Issue for real
certifixes issue yourdomain.com

# Deploy to nginx
certifixes deploy yourdomain.com --server nginx
```

nginx config will be updated and reloaded automatically.

---

## 6. Enable the Renewal Daemon

**Bare metal (systemd):**

```bash
# Enable and start the certifixes daemon
sudo systemctl enable certifixes
sudo systemctl start certifixes

# Check status
sudo systemctl status certifixes

# View logs
sudo journalctl -u certifixes -f
```

**Docker:** The daemon runs inside the container by default. No extra steps needed.

**Kubernetes:** The operator handles renewal automatically.

---

## 7. Configure Alerts

Test your alert channels before going live:

```bash
# Test Slack alert
certifixes alerts test --channel slack

# Test email alert
certifixes alerts test --channel email

# Test PagerDuty
certifixes alerts test --channel pagerduty
```

All channels should report `✔ Alert delivered` before proceeding.

---

## 8. Dashboard Setup

The web dashboard runs on port `8080` by default.

```bash
# Enable dashboard
certifixes dashboard enable

# Access
xdg-open http://localhost:8080
```

For production, put it behind a reverse proxy with TLS:

**nginx snippet:**
```nginx
server {
    listen 443 ssl;
    server_name certifixes.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 9. Firewall & Networking

| Port | Protocol | Required for |
|---|---|---|
| 80 | TCP inbound | HTTP-01 ACME challenge |
| 443 | TCP inbound | TLS-ALPN-01 ACME challenge |
| 8080 | TCP inbound | Web dashboard (internal only) |
| 53 | UDP outbound | DNS validation |

For HTTP-01 challenges, port 80 must be reachable from `0.0.0.0` (not just localhost) during certificate issuance.

---

## 10. Verify Everything Works

Run the full health check:

```bash
certifixes status
```

Expected output:
```
✔  Daemon: running
✔  Config: valid
✔  yourdomain.com: valid, expires in 87 days
✔  *.yourdomain.com: valid, expires in 87 days
✔  Alerts: slack ✔  email ✔
✔  Last renewal check: 2 hours ago
```

---

## 11. Monitoring & Ops

| Task | Command |
|---|---|
| View all certs | `certifixes list` |
| Force renew a cert | `certifixes renew yourdomain.com --force` |
| Revoke a cert | `certifixes revoke yourdomain.com` |
| View renewal history | `certifixes history` |
| Upgrade certifixes | `npm update -g certifixes` |

---

## 12. Troubleshooting

**HTTP-01 challenge failing**
- Ensure port 80 is open to the public internet
- Check your web server is running and serving `/.well-known/acme-challenge/`
- Check firewall rules: `sudo ufw status`

**DNS-01 challenge failing**
- Verify your DNS API credentials in `.env`
- Check `CF_API_TOKEN` has `Zone:DNS:Edit` permission in Cloudflare
- DNS propagation can take up to 5 minutes — certifixes retries automatically

**Certificate deployed but nginx not reloading**
- Check certifixes has sudo rights: `sudo visudo` and add `certifixes ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx`
- Or use `certifixes deploy yourdomain.com --server nginx --reload manual` and reload yourself

**Daemon not starting**
- Check logs: `sudo journalctl -u certifixes -n 50`
- Validate config: `certifixes config validate`
- Check for port conflicts on 80/443

---

## Security Notes

- Store all credentials in `.env` — never hardcode in config files
- Restrict dashboard access with a strong `CERTIFIXES_DASHBOARD_SECRET`
- Run certifixes as a dedicated non-root user where possible
- Certificate private keys are stored in `/etc/certifixes/keys/` — restrict to `chmod 600`
