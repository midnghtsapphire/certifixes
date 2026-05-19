import { renewalJobs } from '../lib/mockData';
import { formatDateTime } from '../lib/utils';
import type { RenewalJob } from '../types';

const statusConfig: Record<RenewalJob['status'], { label: string; class: string }> = {
  'in-progress': { label: 'In Progress', class: 'text-blue-400' },
  queued: { label: 'Queued', class: 'text-yellow-400' },
  completed: { label: 'Completed', class: 'text-green-400' },
  failed: { label: 'Failed', class: 'text-red-400' },
};

export default function RenewalQueue() {
  const inProgress = renewalJobs.filter(j => j.status === 'in-progress');
  const queued = renewalJobs.filter(j => j.status === 'queued');
  const failed = renewalJobs.filter(j => j.status === 'failed');
  const completed = renewalJobs.filter(j => j.status === 'completed');

  return (
    <div className="space-y-6">
      {/* In progress */}
      {inProgress.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-5 border border-blue-800">
          <h2 className="text-sm font-semibold text-blue-300 mb-4">In Progress</h2>
          {inProgress.map(job => (
            <div key={job.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-mono text-sm text-white">{job.domain}</p>
                <p className="text-xs text-gray-400 mt-0.5">{job.provider} · Attempt {job.attempt}</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
              <span className="text-xs text-blue-400 font-medium animate-pulse">● Renewing...</span>
            </div>
          ))}
        </div>
      )}

      {/* Queued */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Queued ({queued.length})</h2>
        {queued.length === 0 ? (
          <p className="text-gray-500 text-sm">No jobs queued.</p>
        ) : (
          <div className="space-y-3">
            {queued.map(job => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <div>
                  <p className="font-mono text-sm text-white">{job.domain}</p>
                  <p className="text-xs text-gray-500">{job.provider} · Scheduled {formatDateTime(job.scheduledAt)}</p>
                </div>
                <span className="text-xs text-yellow-400">Queued</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Failed */}
      {failed.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-5 border border-red-800">
          <h2 className="text-sm font-semibold text-red-300 mb-4">Failed ({failed.length})</h2>
          {failed.map(job => (
            <div key={job.id} className="py-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm text-white">{job.domain}</p>
                <span className="text-xs text-red-400">Attempt {job.attempt}/3</span>
              </div>
              {job.error && (
                <p className="text-xs text-red-300 mt-1 font-mono bg-red-950/50 px-2 py-1 rounded">{job.error}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Completed */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Completed — Last 24h ({completed.length})</h2>
        {completed.length === 0 ? (
          <p className="text-gray-500 text-sm">No completed renewals.</p>
        ) : (
          <div className="space-y-2">
            {completed.map(job => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <div>
                  <p className="font-mono text-sm text-white">{job.domain}</p>
                  <p className="text-xs text-gray-500">{job.provider} · {job.completedAt ? formatDateTime(job.completedAt) : ''}</p>
                </div>
                <span className={`text-xs font-medium ${statusConfig[job.status].class}`}>{statusConfig[job.status].label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
