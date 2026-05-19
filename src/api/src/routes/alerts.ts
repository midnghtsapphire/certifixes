import { Router } from 'express';

const router = Router();

const alerts = [
  { id: 'alert-001', domain: 'mail.oldcompany.org', severity: 'warning', message: 'Certificate expires in 10 days.', createdAt: new Date().toISOString() },
  { id: 'alert-002', domain: 'api.legacyapp.io', severity: 'error', message: 'Certificate expires in 6 days — URGENT.', createdAt: new Date().toISOString() },
];

router.get('/', (_req, res) => {
  res.json({ data: alerts, total: alerts.length });
});

export default router;
