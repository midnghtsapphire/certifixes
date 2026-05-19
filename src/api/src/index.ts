import express from 'express';
import cors from 'cors';
import certificatesRouter from './routes/certificates';
import alertsRouter from './routes/alerts';
import renewalsRouter from './routes/renewals';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/certificates', certificatesRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/renewals', renewalsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`certifixes API running on http://localhost:${PORT}`);
});

export default app;
