import { useState, useEffect } from 'react';

export function useCSVData() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        console.log('🔄 Tentando carregar CSV...');
        
        // Tentar fetch primeiro para ver se o arquivo existe
        const response = await fetch('/data/campeonato.csv');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        console.log('📄 CSV raw recebido, tamanho:', text.length);
        console.log('📄 Primeiras 200 chars:', text.substring(0, 200));
        
        // Parse manual do CSV com separador ;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length === 0) {
          throw new Error('CSV vazio');
        }
        
        // Detectar header
        const headers = lines[0].split(';').map(h => h.trim());
        console.log('📋 Headers detectados:', headers);
        
        // Verificar se temos os campos esperados
        const hasMes = headers.includes('Mes');
        const hasDia = headers.includes('Dia');
        const hasTime = headers.includes('Time');
        
        if (!hasMes || !hasDia || !hasTime) {
          console.warn('⚠️ Headers não encontrados, tentando vírgula como separador...');
          // Tentar com vírgula
          const headersComma = lines[0].split(',').map(h => h.trim());
          console.log('📋 Headers com vírgula:', headersComma);
          
          if (headersComma.includes('Mes') || headersComma.includes('Mes')) {
            // Usar vírgula
            const parsed = parseWithSeparator(lines, ',');
            setDados(parsed);
            setLoading(false);
            return;
          }
          
          throw new Error(`CSV não tem colunas Mes/Dia/Time. Headers: ${headers.join(', ')}`);
        }
        
        // Parse com ;
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          const values = lines[i].split(';');
          
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j] ? values[j].trim() : '';
          }
          
          // Só incluir se tiver dados mínimos
          if (obj.Mes && obj.Dia && obj.Time && obj.Mes.trim() !== '') {
            result.push(obj);
          }
        }
        
        console.log('✅ CSV parseado:', result.length, 'registros válidos');
        console.log('📊 Meses únicos:', [...new Set(result.map(r => r.Mes))]);
        console.log('📊 Dias únicos:', [...new Set(result.map(r => r.Dia))]);
        
        if (result.length === 0) {
          throw new Error('Nenhum registro válido encontrado no CSV');
        }
        
        setDados(result);
        setLoading(false);
        
      } catch (err) {
        console.error('❌ Erro ao carregar CSV:', err.message);
        setError(err);
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  return { dados, loading, error };
}

// Helper para parse com separador custom
function parseWithSeparator(lines, separator) {
  const headers = lines[0].split(separator).map(h => h.trim());
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const values = lines[i].split(separator);
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] ? values[j].trim() : '';
    }
    
    if (obj.Mes && obj.Dia && obj.Time && obj.Mes.trim() !== '') {
      result.push(obj);
    }
  }
  
  return result;
}