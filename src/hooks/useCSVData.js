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
      delimiter: ';',
      complete: (results) => {
        const validData = results.data.filter(row => 
          row.Mes && row.Dia && row.Time && 
          row.Mes.trim() !== '' && row.Dia.trim() !== '' && row.Time.trim() !== ''
        );
        console.log('CSV raw:', results.data.length, 'rows');
        console.log('CSV valid:', validData.length, 'rows');
        console.log('Sample row:', validData[0]);
        setDados(validData);
        setLoading(false);
      },
      error: (err) => {
        console.error('PapaParse error:', err);
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  return { dados, loading, error };
}