import { useState, useMemo } from 'react';
import { alerts as allAlerts } from '../lib/mockData';
import type { Alert, AlertSeverity } from '../types';

export function useAlerts() {
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');
  const [showResolved, setShowResolved] = useState(false);

  const filtered = useMemo(() => {
    return allAlerts.filter((alert: Alert) => {
      if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
      if (!showResolved && alert.resolvedAt !== null) return false;
      return true;
    });
  }, [severityFilter, showResolved]);

  return { alerts: filtered, severityFilter, setSeverityFilter, showResolved, setShowResolved };
}
