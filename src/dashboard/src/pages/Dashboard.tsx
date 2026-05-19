import { Link } from 'react-router-dom';
import { fleetStats, alerts, certificates } from '../lib/mockData';
import AlertItem from '../components/AlertItem';
import StatusBadge from '../components/StatusBadge';
import { formatDate, formatDaysUntilExpiry } from '../lib/utils';

const statCards = [
  { label: 'Total Certs', value: fleetStats.total, color: 'text-white' },
  { label: 'Healthy', value: fleetStats.healthy, color: 'text-green-400' },
  { label: 'Expiring Soon', value: fleetStats.expiringSoon, color: 'text-yellow-400' },
  { label: 'Errors', value: fleetStats.errors + fleetStats.expired, color: 'text-red-400' },
];

const expiringThisWeek = certificates
  .filter(c => c.daysUntilExpiry >= 0 && c.daysUntilExpiry <= 7)
  .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

const recentAlerts = alerts.filter(a => a.resolvedAt === null).slice(0, 5);

export default function Dashboard() {
  const total = fleetStats.total;
  const healthyPct = Math.round((fleetStats.healthy / total) * 100);
  const expiringPct = Math.round((fleetStats.expiringSoon / total) * 100);
  const expiredPct = Math.round((fleetStats.expired / total) * 100);
  const errorPct = Math.round((fleetStats.errors / total) * 100);
  const pendingPct = 100 - healthyPct - expiringPct - expiredPct - errorPct;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status distribution */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Certificate Status Distribution</h2>
          <div className="space-y-3">
            {[
              { label: 'Healthy', pct: healthyPct, count: fleetStats.healthy, color: 'bg-green-500' },
              { label: 'Expiring Soon', pct: expiringPct, count: fleetStats.expiringSoon, color: 'bg-yellow-500' },
              { label: 'Expired', pct: expiredPct, count: fleetStats.expired, color: 'bg-red-600' },
              { label: 'Error', pct: errorPct, count: fleetStats.errors, color: 'bg-red-400' },
              { label: 'Pending', pct: pendingPct, count: certificates.filter(c => c.status === 'pending').length, color: 'bg-blue-500' },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-24">{row.label}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
                <span className="text-xs text-gray-300 w-6 text-right">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-300">Recent Alerts</h2>
            <Link to="/dashboard/alerts" className="text-xs text-green-400 hover:text-green-300">View all →</Link>
          </div>
          {recentAlerts.length === 0 ? (
            <p className="text-gray-500 text-sm">No active alerts.</p>
          ) : (
            <div>
              {recentAlerts.map(a => <AlertItem key={a.id} alert={a} />)}
            </div>
          )}
        </div>
      </div>

      {/* Expiring this week */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-300">Expiring This Week</h2>
          <Link to="/dashboard/certificates" className="text-xs text-green-400 hover:text-green-300">View all →</Link>
        </div>
        {expiringThisWeek.length === 0 ? (
          <p className="text-gray-500 text-sm">No certificates expiring this week. 🎉</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase border-b border-gray-700">
                <th className="text-left pb-2">Domain</th>
                <th className="text-left pb-2">Status</th>
                <th className="text-left pb-2">Expires</th>
                <th className="text-left pb-2">Days Left</th>
              </tr>
            </thead>
            <tbody>
              {expiringThisWeek.map(c => (
                <tr key={c.id} className="border-b border-gray-700 last:border-0">
                  <td className="py-2 font-mono text-xs text-white">{c.domain}</td>
                  <td className="py-2"><StatusBadge status={c.status} /></td>
                  <td className="py-2 text-gray-400">{formatDate(c.expiresAt)}</td>
                  <td className="py-2 text-red-400 font-medium">{formatDaysUntilExpiry(c.daysUntilExpiry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
