# certifixes

**Automated SSL/TLS certificate management and repair for production systems.**

certifixes monitors your certificates, catches problems before they cause outages, and fixes misconfigurations automatically — so you never wake up to a cert emergency again.

---

## Why certifixes

SSL certificate failures take down sites, break APIs, and erode user trust — often with zero warning. certifixes runs continuous diagnostics, alerts you to issues before expiry, and applies automated fixes for the most common certificate problems:

- **Broken chain** — intermediate certificates out of order or missing
- **Expiry** — auto-renewal via ACME / Let's Encrypt
- **SANs mismatch** — hostname not covered by certificate
- **Wrong key type** — RSA vs EC mismatches caught before deployment
- **HSTS / OCSP misconfiguration** — stapling and policy fixes applied automatically
- **CAA record gaps** — DNS-level certificate authority authorization validation

---

## Features

| Feature | Description |
|---|---|
| 🔍 **Deep cert diagnostics** | Full chain validation, SANs check, expiry, OCSP, and key type |
| 🔄 **Auto-renewal** | ACME v2 protocol; Let's Encrypt, ZeroSSL, Buypass |
| 🛠️ **Auto-repair** | Fixes chain ordering, stapling, and common nginx/Apache misconfigs |
| 📣 **Multi-channel alerts** | Slack, email, PagerDuty, webhooks |
| 📊 **Dashboard** | Web UI for fleet-wide certificate health |
| 🌐 **Multi-provider** | Let's Encrypt, DigiCert, Sectigo, Google Trust Services |
| 🖥️ **Multi-server** | Works with nginx, Apache, Caddy, HAProxy, Traefik |
| ☁️ **Cloud-native** | Kubernetes operator, Docker, bare metal |

---

## Quick Start

### Requirements

- Node.js 20+ or Docker
- Root or `sudo` access on target servers (for cert deployment)
- DNS API credentials for DNS-01 challenges (optional, required for wildcard certs)

### Install (CLI)

```bash
npm install -g certifixes
```

### Initialize

```bash
certifixes init
```

This creates a `certifixes.config.yaml` in your working directory with sensible defaults.

### Add your first domain

```bash
certifixes add example.com --email admin@example.com
```

### Run a full scan

```bash
certifixes scan example.com
```

Example output:
```
✔  Certificate found: *.example.com
✔  Valid chain: example.com → R3 → ISRG Root X1
⚠  Expires in 14 days — auto-renewal queued
✔  OCSP stapling: active
✔  SANs: example.com, www.example.com
```

### Enable auto-renewal daemon

```bash
certifixes daemon start
```

The daemon checks certificates every 12 hours and renews 30 days before expiry.

---

## Configuration

```yaml
# certifixes.config.yaml

domains:
  - host: example.com
    email: admin@example.com
    provider: letsencrypt          # letsencrypt | zerossl | buypass | digicert
    challenge: http-01             # http-01 | dns-01 | tls-alpn-01
    server: nginx                  # nginx | apache | caddy | haproxy | traefik | raw

  - host: "*.example.com"
    email: admin@example.com
    provider: letsencrypt
    challenge: dns-01
    dns_provider: cloudflare       # cloudflare | route53 | gcloud | azure | digitalocean

alerts:
  slack_webhook: ${SLACK_WEBHOOK_URL}
  email: ops@example.com
  expiry_warning_days: [30, 14, 7, 1]

renewal:
  auto: true
  days_before_expiry: 30
  retry_interval_hours: 6
```

All secrets (API keys, webhook URLs) are loaded from environment variables — never hardcoded.

---

## Environment Variables

| Variable | Description |
|---|---|
| `CERTIFIXES_EMAIL` | Default contact email for all certs |
| `CF_API_TOKEN` | Cloudflare API token (DNS-01 via Cloudflare) |
| `AWS_ACCESS_KEY_ID` | AWS key (DNS-01 via Route 53) |
| `SLACK_WEBHOOK_URL` | Slack webhook for alerts |
| `PAGERDUTY_ROUTING_KEY` | PagerDuty routing key |
| `CERTIFIXES_DASHBOARD_SECRET` | Secret for web dashboard auth |

Copy `.env.example` to `.env` and fill in your values.

---

## Kubernetes Operator

```bash
kubectl apply -f https://install.certifixes.io/operator/latest
```

Then annotate your Ingress:

```yaml
metadata:
  annotations:
    certifixes.io/enabled: "true"
    certifixes.io/provider: letsencrypt
```

---

## Docker

```bash
docker run -d \
  --name certifixes \
  -v /etc/certifixes:/config \
  -v /etc/letsencrypt:/certs \
  -e CERTIFIXES_EMAIL=admin@example.com \
  ghcr.io/midnghtsapphire/certifixes:latest
```

---

## Development

```bash
git clone https://github.com/midnghtsapphire/certifixes.git
cd certifixes
npm install
npm run dev
npm test
```

---

## License

All Rights Reserved. © 2024–2026 Audrey Evans / GlowStarLabs.  
See [LICENSE](./LICENSE) for terms.

---

## Support

- **Issues:** [github.com/midnghtsapphire/certifixes/issues](https://github.com/midnghtsapphire/certifixes/issues)
- **Email:** angelreports@gmail.com
