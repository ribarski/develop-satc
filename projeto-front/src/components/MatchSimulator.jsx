/**
 * Componente que permite ao usuário simular os resultados das rodadas.
 * Exibe os confrontos de uma rodada e inputs para inserção dos placares.
 */
import PropTypes from 'prop-types';

function MatchSimulator({ rodadas, times, onAtualizarPlacar, rodadaSelecionada, onSelecionarRodada }) {
  const rodadaAtual = rodadas.find((r) => r.roundNumber === rodadaSelecionada);

  function obterNomeTime(id) {
    const time = times.find((t) => t.id === id);
    return time ? time.name : 'Time desconhecido';
  }

  function handleGolsChange(matchId, campo, valor) {
    const gols = valor === '' ? null : Math.max(0, Number.parseInt(valor, 10));
    onAtualizarPlacar(matchId, campo, gols);
  }

  function handleIncrementar(matchId, campo, valorAtual) {
    const novoValor = valorAtual === null ? 1 : valorAtual + 1;
    onAtualizarPlacar(matchId, campo, novoValor);
  }

  function handleDecrementar(matchId, campo, valorAtual) {
    if (valorAtual === null || valorAtual === 0) return;
    onAtualizarPlacar(matchId, campo, valorAtual - 1);
  }

  return (
    <section className="simulator-section">
      <h2 className="section-title">⚽ Simulador de Rodadas</h2>

      <div className="round-selector">
        {rodadas.map((rodada) => (
          <button
            key={rodada.roundNumber}
            className={`round-btn ${rodadaSelecionada === rodada.roundNumber ? 'active' : ''}`}
            onClick={() => onSelecionarRodada(rodada.roundNumber)}
          >
            Rodada {rodada.roundNumber}
          </button>
        ))}
      </div>

      {rodadaAtual && (
        <div className="matches-list">
          {rodadaAtual.matches.map((partida) => (
            <div key={partida.id} className="match-card">
              <div className="team-home">
                <span className="team-label">{obterNomeTime(partida.homeTeamId)}</span>
              </div>

              <div className="score-controls">
                <div className="score-input-group">
                  <button
                    className="score-btn decrement"
                    onClick={() => handleDecrementar(partida.id, 'homeGoals', partida.homeGoals)}
                    aria-label="Diminuir gols mandante"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="score-input"
                    min="0"
                    value={partida.homeGoals ?? ''}
                    placeholder="-"
                    onChange={(e) => handleGolsChange(partida.id, 'homeGoals', e.target.value)}
                    aria-label={`Gols ${obterNomeTime(partida.homeTeamId)}`}
                  />
                  <button
                    className="score-btn increment"
                    onClick={() => handleIncrementar(partida.id, 'homeGoals', partida.homeGoals)}
                    aria-label="Aumentar gols mandante"
                  >
                    +
                  </button>
                </div>

                <span className="score-separator">×</span>

                <div className="score-input-group">
                  <button
                    className="score-btn decrement"
                    onClick={() => handleDecrementar(partida.id, 'awayGoals', partida.awayGoals)}
                    aria-label="Diminuir gols visitante"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="score-input"
                    min="0"
                    value={partida.awayGoals ?? ''}
                    placeholder="-"
                    onChange={(e) => handleGolsChange(partida.id, 'awayGoals', e.target.value)}
                    aria-label={`Gols ${obterNomeTime(partida.awayTeamId)}`}
                  />
                  <button
                    className="score-btn increment"
                    onClick={() => handleIncrementar(partida.id, 'awayGoals', partida.awayGoals)}
                    aria-label="Aumentar gols visitante"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="team-away">
                <span className="team-label">{obterNomeTime(partida.awayTeamId)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

MatchSimulator.propTypes = {
  rodadas: PropTypes.array.isRequired,
  times: PropTypes.array.isRequired,
  onAtualizarPlacar: PropTypes.func.isRequired,
  rodadaSelecionada: PropTypes.number.isRequired,
  onSelecionarRodada: PropTypes.func.isRequired,
};

export default MatchSimulator;
