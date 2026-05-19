import { Router } from 'express';

const router = Router();

const jobs = [
  { id: 'job-001', domain: 'status.monitoring-hub.io', status: 'in-progress', provider: 'letsencrypt', attempt: 1 },
  { id: 'job-002', domain: 'mail.oldcompany.org', status: 'queued', provider: 'letsencrypt', attempt: 1 },
];

router.get('/', (_req, res) => {
  res.json({ data: jobs, total: jobs.length });
});

export default router;
