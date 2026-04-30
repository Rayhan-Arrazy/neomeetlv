import { useEffect, useState } from 'react';
import { Schedule } from '../lib/utils';
import { getSchedules } from '../lib/utils';
import { isApiError } from '../lib/api-types';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await getSchedules();
      setSchedules(response.data);
      setError(null);
    } catch (e) {
      if (isApiError(e)) {
        setError(e.response?.data.message || 'Failed to fetch schedules');
      } else {
        setError('Failed to fetch schedules');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    refetch: fetchSchedules,
  };
}