import { Link } from 'react-router-dom';
import { useCertificates } from '../hooks/useCertificates';
import StatusBadge from '../components/StatusBadge';
import { formatDate, formatDaysUntilExpiry } from '../lib/utils';
import type { CertStatus, ProviderName, ServerType } from '../types';

const statusOptions: Array<{ value: CertStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All Statuses' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'expiring-soon', label: 'Expiring Soon' },
  { value: 'expired', label: 'Expired' },
  { value: 'error', label: 'Error' },
  { value: 'pending', label: 'Pending' },
];

const providerOptions: Array<{ value: ProviderName | 'all'; label: string }> = [
  { value: 'all', label: 'All Providers' },
  { value: 'letsencrypt', label: "Let's Encrypt" },
  { value: 'zerossl', label: 'ZeroSSL' },
  { value: 'buypass', label: 'Buypass' },
  { value: 'digicert', label: 'DigiCert' },
];

const serverOptions: Array<{ value: ServerType | 'all'; label: string }> = [
  { value: 'all', label: 'All Servers' },
  { value: 'nginx', label: 'nginx' },
  { value: 'apache', label: 'Apache' },
  { value: 'caddy', label: 'Caddy' },
  { value: 'haproxy', label: 'HAProxy' },
  { value: 'traefik', label: 'Traefik' },
];

export default function Certificates() {
  const { certificates, filters, setFilters, total } = useCertificates();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search domains..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-300 placeholder-gray-500 w-48 focus:outline-none focus:border-gray-500"
        />
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value as CertStatus | 'all' }))}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-gray-500"
        >
          {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filters.provider}
          onChange={e => setFilters(f => ({ ...f, provider: e.target.value as ProviderName | 'all' }))}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-gray-500"
        >
          {providerOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filters.server}
          onChange={e => setFilters(f => ({ ...f, server: e.target.value as ServerType | 'all' }))}
          className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-gray-500"
        >
          {serverOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="self-center text-xs text-gray-500">
          Showing {certificates.length} of {total}
        </span>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-900 border-b border-gray-700">
              <th className="text-left px-4 py-3">Domain</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Provider</th>
              <th className="text-left px-4 py-3">Server</th>
              <th className="text-left px-4 py-3">Expires</th>
              <th className="text-left px-4 py-3">Auto-Renewal</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map(cert => (
              <tr key={cert.id} className="border-b border-gray-700 last:border-0 hover:bg-gray-700 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {cert.isWildcard && <span className="text-xs text-purple-400 font-mono">*</span>}
                    <span className="font-mono text-xs text-white">{cert.domain}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={cert.status} /></td>
                <td className="px-4 py-3 text-gray-400 text-xs capitalize">{cert.provider}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{cert.server}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-300">{formatDate(cert.expiresAt)}</p>
                    <p className={`text-xs ${cert.daysUntilExpiry <= 14 ? 'text-red-400' : 'text-gray-500'}`}>
                      {formatDaysUntilExpiry(cert.daysUntilExpiry)}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${cert.autoRenewal ? 'text-green-400' : 'text-gray-500'}`}>
                    {cert.autoRenewal ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/certificates/${cert.id}`}
                    className="text-xs text-green-400 hover:text-green-300 transition-colors"
                  >
                    Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
