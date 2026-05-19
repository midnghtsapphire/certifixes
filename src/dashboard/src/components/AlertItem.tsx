import type { Alert, AlertSeverity } from '../types';
import { formatDateTime } from '../lib/utils';

interface Props {
  alert: Alert;
}

const severityConfig: Record<AlertSeverity, { dot: string; text: string }> = {
  info: { dot: 'bg-blue-400', text: 'text-blue-400' },
  warning: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
  error: { dot: 'bg-red-400', text: 'text-red-400' },
  success: { dot: 'bg-green-400', text: 'text-green-400' },
};

export default function AlertItem({ alert }: Props) {
  const cfg = severityConfig[alert.severity];
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-700 last:border-0">
      <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold uppercase ${cfg.text}`}>{alert.severity}</span>
          <span className="font-mono text-xs text-gray-400">{alert.domain}</span>
          {alert.resolvedAt && (
            <span className="text-xs text-green-500 ml-auto">Resolved</span>
          )}
        </div>
        <p className="text-sm text-gray-300 mt-0.5">{alert.message}</p>
        <p className="text-xs text-gray-500 mt-1">{formatDateTime(alert.createdAt)}</p>
      </div>
    </div>
  );
}
