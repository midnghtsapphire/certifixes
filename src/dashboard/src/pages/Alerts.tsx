import { useAlerts } from '../hooks/useAlerts';
import AlertItem from '../components/AlertItem';
import type { AlertSeverity } from '../types';

const severities: Array<{ value: AlertSeverity | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'error', label: 'Error' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
];

export default function Alerts() {
  const { alerts, severityFilter, setSeverityFilter, showResolved, setShowResolved } = useAlerts();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1">
          {severities.map(s => (
            <button
              key={s.value}
              onClick={() => setSeverityFilter(s.value)}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                severityFilter === s.value
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400 ml-auto cursor-pointer">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={e => setShowResolved(e.target.checked)}
            className="rounded"
          />
          Show resolved
        </label>
      </div>

      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-sm">No alerts match your filters.</p>
        ) : (
          alerts.map(a => <AlertItem key={a.id} alert={a} />)
        )}
      </div>
    </div>
  );
}
