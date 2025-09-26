import { useEffect, useState } from 'react';
import { fetchHello } from '../api/helloApi';

export function useHello() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchHello()
      .then(d => { if(alive){ setData(d); setLoading(false);} })
      .catch(e => { if(alive){ setError(e); setLoading(false);} });
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}

