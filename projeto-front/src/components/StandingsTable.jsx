/**
 * Componente que exibe a tabela de classificação do campeonato.
 * Recebe a lista de times já calculada e ordenada como prop.
 */
import PropTypes from 'prop-types';

function StandingsTable({ times }) {
  return (
    <section className="standings-section">
      <h2 className="section-title">🏆 Tabela de Classificação</h2>
      <div className="table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th title="Posição">#</th>
              <th className="team-name-col">Time</th>
              <th title="Pontos">P</th>
              <th title="Jogos">J</th>
              <th title="Vitórias">V</th>
              <th title="Empates">E</th>
              <th title="Derrotas">D</th>
              <th title="Gols Pró">GP</th>
              <th title="Gols Contra">GC</th>
              <th title="Saldo de Gols">SG</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => {
              const saldoGols = time.goalsFor - time.goalsAgainst;
              const posicaoClasse = obterClassePosicao(index + 1);
              const saldoClasse = saldoGols > 0 ? 'saldo-positivo' : saldoGols < 0 ? 'saldo-negativo' : '';
              return (
                <tr key={time.id} className={`standings-row ${posicaoClasse}`}>
                  <td className="position-col">
                    <span className="position-badge">{index + 1}</span>
                  </td>
                  <td className="team-name-col">{time.name}</td>
                  <td className="points-col">{time.points}</td>
                  <td>{time.played}</td>
                  <td>{time.wins}</td>
                  <td>{time.draws}</td>
                  <td>{time.losses}</td>
                  <td>{time.goalsFor}</td>
                  <td>{time.goalsAgainst}</td>
                  <td className={saldoClasse}>
                    {saldoGols > 0 ? `+${saldoGols}` : saldoGols}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/**
 * Retorna a classe CSS correspondente à posição na tabela.
 * @param {number} posicao - Posição do time (1-based)
 * @returns {string} Nome da classe CSS
 */
function obterClassePosicao(posicao) {
  if (posicao <= 4) return 'zona-libertadores';
  if (posicao <= 6) return 'zona-sulamericana';
  return '';
}

StandingsTable.propTypes = {
  times: PropTypes.array.isRequired,
};

export default StandingsTable;
