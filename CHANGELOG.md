# Changelog

All notable changes to certifixes will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Project scaffolding and repository structure
- Universal agent instructions (`AGENTS.md`)
- All Rights Reserved license
- Ship-to-market documentation: README, DEPLOYMENT_GUIDE, GO_TO_MARKET, CHANGELOG, `.env.example`, `.gitignore`
- Web dashboard UI (`src/dashboard/`) — React 18 + Vite + Tailwind CSS; marketing landing page and 6 dashboard pages
- Express API skeleton (`src/api/`) — `/api/certificates`, `/api/alerts`, `/api/renewals` endpoints

### Planned for v0.1.0
- CLI entry point: `certifixes init`, `add`, `scan`, `daemon`
- ACME v2 certificate issuance via Let's Encrypt, ZeroSSL, and Buypass
- HTTP-01, DNS-01, and TLS-ALPN-01 challenge support
- Deep certificate diagnostics: chain validation, SANs check, expiry, OCSP, key type
- Auto-repair for chain ordering, OCSP stapling misconfiguration
- nginx, Apache, Caddy, HAProxy, and Traefik deployment support
- Automated renewal daemon with configurable lead time (default: 30 days)
- `certifixes.config.yaml` configuration file with environment variable interpolation
- Slack, email, PagerDuty, and generic webhook alerting
- Cloudflare, Route 53, Google Cloud DNS, Azure DNS, and DigitalOcean DNS providers
- Docker image (`ghcr.io/midnghtsapphire/certifixes`)
- Kubernetes operator with Ingress annotation support

---

[Unreleased]: https://github.com/midnghtsapphire/certifixes/compare/HEAD
