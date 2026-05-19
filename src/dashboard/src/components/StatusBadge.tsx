import type { CertStatus } from '../types';

interface Props {
  status: CertStatus;
  size?: 'sm' | 'md';
}

const config: Record<CertStatus, { label: string; className: string }> = {
  healthy: { label: 'Healthy', className: 'bg-green-900 text-green-300 border border-green-700' },
  'expiring-soon': { label: 'Expiring Soon', className: 'bg-yellow-900 text-yellow-300 border border-yellow-700' },
  expired: { label: 'Expired', className: 'bg-red-900 text-red-300 border border-red-700' },
  error: { label: 'Error', className: 'bg-red-900 text-red-400 border border-red-600' },
  pending: { label: 'Pending', className: 'bg-blue-900 text-blue-300 border border-blue-700' },
};

export default function StatusBadge({ status, size = 'sm' }: Props) {
  const { label, className } = config[status];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${className}`}>
      {label}
    </span>
  );
}
