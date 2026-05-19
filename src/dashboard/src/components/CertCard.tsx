import { Link } from 'react-router-dom';
import type { Certificate } from '../types';
import StatusBadge from './StatusBadge';
import ExpiryBar from './ExpiryBar';
import { formatDaysUntilExpiry, getExpiryPercent } from '../lib/utils';

interface Props {
  cert: Certificate;
}

export default function CertCard({ cert }: Props) {
  const percent = getExpiryPercent(cert.issuedAt, cert.expiresAt);

  return (
    <Link
      to={`/dashboard/certificates/${cert.id}`}
      className="block bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-mono text-sm font-medium text-white truncate max-w-[180px]">{cert.domain}</p>
          <p className="text-xs text-gray-400 mt-0.5">{cert.provider} · {cert.server}</p>
        </div>
        <StatusBadge status={cert.status} />
      </div>
      <ExpiryBar percent={percent} daysUntilExpiry={cert.daysUntilExpiry} />
      <p className="text-xs text-gray-400 mt-2">{formatDaysUntilExpiry(cert.daysUntilExpiry)}</p>
    </Link>
  );
}
