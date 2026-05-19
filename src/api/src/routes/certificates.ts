import { Router } from 'express';

const router = Router();

const certs = [
  { id: 'cert-001', domain: 'api.acmecorp.io', status: 'healthy', provider: 'letsencrypt', daysUntilExpiry: 72 },
  { id: 'cert-002', domain: '*.acmecorp.io', status: 'healthy', provider: 'letsencrypt', daysUntilExpiry: 55 },
  { id: 'cert-007', domain: 'mail.oldcompany.org', status: 'expiring-soon', provider: 'letsencrypt', daysUntilExpiry: 10 },
];

router.get('/', (_req, res) => {
  res.json({ data: certs, total: certs.length });
});

router.get('/:id', (req, res) => {
  const cert = certs.find(c => c.id === req.params.id);
  if (!cert) return res.status(404).json({ error: 'Certificate not found' });
  return res.json(cert);
});

export default router;
