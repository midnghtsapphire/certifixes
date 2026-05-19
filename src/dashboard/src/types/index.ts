export type CertStatus = 'healthy' | 'expiring-soon' | 'expired' | 'error' | 'pending';
export type ChallengeType = 'http-01' | 'dns-01' | 'tls-alpn-01';
export type ProviderName = 'letsencrypt' | 'zerossl' | 'buypass' | 'digicert';
export type ServerType = 'nginx' | 'apache' | 'caddy' | 'haproxy' | 'traefik' | 'raw';

export interface SAN {
  value: string;
  covered: boolean;
}

export interface ChainLink {
  subject: string;
  issuer: string;
  valid: boolean;
}

export interface Certificate {
  id: string;
  domain: string;
  status: CertStatus;
  provider: ProviderName;
  server: ServerType;
  challenge: ChallengeType;
  isWildcard: boolean;
  expiresAt: string;
  issuedAt: string;
  renewsAt: string;
  daysUntilExpiry: number;
  chain: ChainLink[];
  sans: SAN[];
  ocspStapling: boolean;
  autoRenewal: boolean;
  lastScanned: string;
  lastRepaired: string | null;
}

export type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

export interface Alert {
  id: string;
  domain: string;
  severity: AlertSeverity;
  message: string;
  resolvedAt: string | null;
  createdAt: string;
}

export interface RenewalJob {
  id: string;
  domain: string;
  status: 'queued' | 'in-progress' | 'completed' | 'failed';
  provider: ProviderName;
  attempt: number;
  scheduledAt: string;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
}

export interface FleetStats {
  total: number;
  healthy: number;
  expiringSoon: number;
  expired: number;
  errors: number;
  autoRenewalEnabled: number;
}
