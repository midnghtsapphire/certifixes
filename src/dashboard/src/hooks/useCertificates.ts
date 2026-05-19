import { useState, useMemo } from 'react';
import { certificates as allCerts } from '../lib/mockData';
import type { Certificate, CertStatus, ProviderName, ServerType } from '../types';

export interface CertFilters {
  status: CertStatus | 'all';
  provider: ProviderName | 'all';
  server: ServerType | 'all';
  search: string;
}

export function useCertificates() {
  const [filters, setFilters] = useState<CertFilters>({
    status: 'all',
    provider: 'all',
    server: 'all',
    search: '',
  });

  const filtered = useMemo(() => {
    return allCerts.filter((cert: Certificate) => {
      if (filters.status !== 'all' && cert.status !== filters.status) return false;
      if (filters.provider !== 'all' && cert.provider !== filters.provider) return false;
      if (filters.server !== 'all' && cert.server !== filters.server) return false;
      if (filters.search && !cert.domain.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return { certificates: filtered, filters, setFilters, total: allCerts.length };
}
