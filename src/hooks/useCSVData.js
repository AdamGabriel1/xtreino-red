import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export function useCSVData() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse('/data/campeonato.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setDados(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  return { dados, loading, error };
}
