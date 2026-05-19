import { useParams, Link } from 'react-router-dom';
import { certificates } from '../lib/mockData';
import StatusBadge from '../components/StatusBadge';
import { formatDate, formatDateTime } from '../lib/utils';

export default function CertDetail() {
  const { id } = useParams<{ id: string }>();
  const cert = certificates.find(c => c.id === id);

  if (!cert) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Certificate not found.</p>
        <Link to="/dashboard/certificates" className="text-green-400 text-sm mt-2 inline-block">← Back to Certificates</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/certificates" className="text-xs text-gray-500 hover:text-gray-300">← Certificates</Link>
      </div>

      {/* Main info */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-mono text-xl font-bold text-white">{cert.domain}</h2>
            <p className="text-sm text-gray-400 mt-1">{cert.provider} · {cert.server} · {cert.challenge}</p>
          </div>
          <StatusBadge status={cert.status} size="md" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Issued', value: formatDate(cert.issuedAt) },
            { label: 'Expires', value: formatDate(cert.expiresAt) },
            { label: 'Renews At', value: formatDate(cert.renewsAt) },
            { label: 'Last Scanned', value: formatDateTime(cert.lastScanned) },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-sm text-gray-200 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cert.ocspStapling ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-400">OCSP Stapling {cert.ocspStapling ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cert.autoRenewal ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-400">Auto-Renewal {cert.autoRenewal ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cert.isWildcard ? 'bg-purple-400' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-400">{cert.isWildcard ? 'Wildcard' : 'Single-domain'}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chain */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Certificate Chain</h3>
          {cert.chain.length === 0 ? (
            <p className="text-gray-500 text-sm">Chain not available (pending issuance).</p>
          ) : (
            <div className="space-y-2">
              {cert.chain.map((link, i) => (
                <div key={i} className={`flex items-start gap-3 p-2 rounded ${link.valid ? 'bg-gray-700' : 'bg-red-950 border border-red-800'}`}>
                  <span className={`mt-0.5 text-xs ${link.valid ? 'text-green-400' : 'text-red-400'}`}>{link.valid ? '✓' : '✗'}</span>
                  <div>
                    <p className="text-xs font-mono text-white">{link.subject}</p>
                    <p className="text-xs text-gray-500">Issued by: {link.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SANs */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Subject Alternative Names</h3>
          <div className="space-y-2">
            {cert.sans.map(san => (
              <div key={san.value} className="flex items-center justify-between py-1.5 border-b border-gray-700 last:border-0">
                <span className="font-mono text-xs text-white">{san.value}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${san.covered ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                  {san.covered ? 'Covered' : 'Not covered'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          Trigger Scan
        </button>
        <button className="bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          Force Renewal
        </button>
        {cert.lastRepaired && (
          <span className="self-center text-xs text-gray-500">Last repaired: {formatDate(cert.lastRepaired)}</span>
        )}
      </div>
    </div>
  );
}
