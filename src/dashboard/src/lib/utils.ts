export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDaysUntilExpiry(days: number): string {
  if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  return `${days} days`;
}

export function getStatusFromDays(days: number): 'healthy' | 'expiring-soon' | 'expired' {
  if (days < 0) return 'expired';
  if (days <= 14) return 'expiring-soon';
  return 'healthy';
}

export function getExpiryPercent(issuedAt: string, expiresAt: string): number {
  const issued = new Date(issuedAt).getTime();
  const expires = new Date(expiresAt).getTime();
  const now = Date.now();
  const total = expires - issued;
  const elapsed = now - issued;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}
