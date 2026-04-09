import { useState, useMemo } from 'react';
import './App.css';
import dadosIniciais from './data/mockData.json';
import { calcularTabela } from './utils/tableCalculator';
import StandingsTable from './components/StandingsTable';
import MatchSimulator from './components/MatchSimulator';

function App() {
  const [rodadas, setRodadas] = useState(dadosIniciais.rounds);
  const [rodadaSelecionada, setRodadaSelecionada] = useState(
    dadosIniciais.rounds[0]?.roundNumber ?? 1
  );

  const tabela = useMemo(
    () => calcularTabela(dadosIniciais.teams, rodadas),
    [rodadas]
  );

  function atualizarPlacar(matchId, campo, valor) {
    setRodadas((rodadasAtuais) =>
      rodadasAtuais.map((rodada) => ({
        ...rodada,
        matches: rodada.matches.map((partida) =>
          partida.id === matchId ? { ...partida, [campo]: valor } : partida
        ),
      }))
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🇧🇷 Simulador do Brasileirão</h1>
        <p className="app-subtitle">Insira os placar e acompanhe a tabela em tempo real</p>
      </header>

      <main className="app-main">
        <MatchSimulator
          rodadas={rodadas}
          times={dadosIniciais.teams}
          onAtualizarPlacar={atualizarPlacar}
          rodadaSelecionada={rodadaSelecionada}
          onSelecionarRodada={setRodadaSelecionada}
        />
        <StandingsTable times={tabela} />
      </main>

      <footer className="app-footer">
        <div className="legenda">
          <span className="legenda-item zona-libertadores-badge">Libertadores (1°–4°)</span>
          <span className="legenda-item zona-sulamericana-badge">Sul-Americana (5°–6°)</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
