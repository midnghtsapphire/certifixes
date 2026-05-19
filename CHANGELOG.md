# Changelog

All notable changes to certifixes will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Project scaffolding and repository structure
- Universal agent instructions (`AGENTS.md`)
- All Rights Reserved license

---

## [0.1.0] — Planned

### Added
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
- Web dashboard for fleet-wide certificate health monitoring
- Docker image (`ghcr.io/midnghtsapphire/certifixes`)
- Kubernetes operator with Ingress annotation support
- `.env.example` with all required environment variable documentation

---

[Unreleased]: https://github.com/midnghtsapphire/certifixes/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/midnghtsapphire/certifixes/releases/tag/v0.1.0
