# XTREINO Blood Strike - Dashboard de Torneio

Dashboard interativo para acompanhamento de estatísticas do XTreino Blood Strike, desenvolvido com React + Vite.

## 📁 Estrutura do Projeto

```
xtreino-blood-strike/
├── public/
│   └── data/
│       └── campeonato.csv          # Arquivo CSV com os dados do torneio
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Cabeçalho com logo e indicador live
│   │   ├── NavTabs.jsx             # Navegação por abas
│   │   ├── QuickStats.jsx          # Estatísticas rápidas (cards superiores)
│   │   ├── TabelaPontos.jsx        # Tabela de classificação com filtros
│   │   ├── TimesGrid.jsx           # Grid de times com elencos detalhados
│   │   └── MiniLeaderboard.jsx     # Top 3 do dia
│   ├── hooks/
│   │   ├── useCSVData.js           # Hook para carregar CSV com PapaParse
│   │   └── usePontuacao.js         # Hook para calcular pontuações (PP + Kills = PT)
│   ├── context/
│   │   └── TorneioContext.jsx      # Estado global (dados, filtros, tema)
│   ├── utils/
│   │   └── calculos.js             # Funções de cálculo e ordenação
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Estilos globais e variáveis CSS
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### 3. Build para produção
```bash
npm run build
```

## 📊 Formato do CSV

O arquivo `public/data/campeonato.csv` deve seguir o seguinte formato:

```csv
Mes,Dia,Time,Jogador,Q1_Pos,Q1_Kills,Q2_Pos,Q2_Kills,Q3_Pos,Q3_Kills,MVP_Vezes,Dano_Medio
Maio,19,UGD,Player1,1,5,2,3,3,4,1,1200
Maio,19,UGD,Player2,1,4,2,2,3,3,0,1100
```

### Colunas:
- **Mes**: Mês do torneio (ex: Maio, Junho)
- **Dia**: Dia do torneio (ex: 19, 20)
- **Time**: Nome do time/clã
- **Jogador**: Nick do jogador
- **Q1_Pos, Q2_Pos, Q3_Pos**: Posição em cada queda (1-15+)
- **Q1_Kills, Q2_Kills, Q3_Kills**: Kills em cada queda
- **MVP_Vezes**: Quantidade de vezes MVP
- **Dano_Medio**: Dano médio causado

## 🎮 Sistema de Pontuação

- **PP (Pontos de Posição)**: Baseado na posição final em cada queda
  - 1º: 12 pts | 2º: 9 pts | 3º: 7 pts | 4º: 5 pts | 5º: 4 pts | 6º: 3 pts | 7º: 2 pts | 8º+: 1 pt
- **PK (Pontos de Kill)**: 1 kill = 1 ponto
- **PT (Pontuação Total)**: PP + PK

## 🎯 Funcionalidades

- ✅ Carregamento automático de CSV
- ✅ Filtros por mês e dia
- ✅ Classificação automática com critérios de desempate
- ✅ Análise detalhada de elencos por time
- ✅ Estatísticas gerais (Melhor Time, Top Fragger, MVP)
- ✅ Busca por time ou jogador
- ✅ Tema claro/escuro
- ✅ Navegação por teclado (setas ← →)
- ✅ Design responsivo

## 📝 Atualizando os Dados

Simplesmente substitua o arquivo `public/data/campeonato.csv` com os novos dados. O dashboard atualizará automaticamente ao recarregar a página.

## 🛠️ Tecnologias

- React 18
- Vite
- PapaParse (CSV parsing)
- CSS puro (sem frameworks de UI)
