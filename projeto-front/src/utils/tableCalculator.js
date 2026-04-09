/**
 * Módulo responsável pelo cálculo e ordenação da tabela do campeonato.
 * Todas as funções são puras para garantir testabilidade e previsibilidade.
 */

/**
 * Calcula os pontos ganhos por um time com base no resultado de uma partida.
 * @param {number} golsMarcados - Gols marcados pelo time
 * @param {number} golsSofridos - Gols sofridos pelo time
 * @returns {{ pontos: number, vitorias: number, empates: number, derrotas: number }}
 */
export function calcularResultadoDaPartida(golsMarcados, golsSofridos) {
  if (golsMarcados > golsSofridos) {
    return { pontos: 3, vitorias: 1, empates: 0, derrotas: 0 };
  }
  if (golsMarcados === golsSofridos) {
    return { pontos: 1, vitorias: 0, empates: 1, derrotas: 0 };
  }
  return { pontos: 0, vitorias: 0, empates: 0, derrotas: 1 };
}

/**
 * Acumula os dados de uma partida já jogada no registro do time.
 * @param {Object} time - Estado atual do time na tabela
 * @param {number} golsMarcados - Gols marcados pelo time nesta partida
 * @param {number} golsSofridos - Gols sofridos pelo time nesta partida
 * @returns {Object} Novo estado do time com os dados acumulados
 */
export function acumularPartida(time, golsMarcados, golsSofridos) {
  const resultado = calcularResultadoDaPartida(golsMarcados, golsSofridos);
  return {
    ...time,
    played: time.played + 1,
    points: time.points + resultado.pontos,
    wins: time.wins + resultado.vitorias,
    draws: time.draws + resultado.empates,
    losses: time.losses + resultado.derrotas,
    goalsFor: time.goalsFor + golsMarcados,
    goalsAgainst: time.goalsAgainst + golsSofridos,
  };
}

/**
 * Compara dois times para fins de ordenação da tabela.
 * Critérios de desempate (em ordem): Pontos > Vitórias > Saldo de Gols > Gols Pró.
 * @param {Object} timeA - Primeiro time
 * @param {Object} timeB - Segundo time
 * @returns {number} Negativo se A vem antes, positivo se B vem antes
 */
export function compararTimes(timeA, timeB) {
  const diferencaPontos = timeB.points - timeA.points;
  if (diferencaPontos !== 0) return diferencaPontos;

  const diferencaVitorias = timeB.wins - timeA.wins;
  if (diferencaVitorias !== 0) return diferencaVitorias;

  const saldoA = timeA.goalsFor - timeA.goalsAgainst;
  const saldoB = timeB.goalsFor - timeB.goalsAgainst;
  const diferencaSaldo = saldoB - saldoA;
  if (diferencaSaldo !== 0) return diferencaSaldo;

  return timeB.goalsFor - timeA.goalsFor;
}

/**
 * Ordena a tabela de times conforme os critérios oficiais do Brasileirão.
 * @param {Array} times - Lista de times com suas estatísticas
 * @returns {Array} Nova lista de times ordenada
 */
export function ordenarTabela(times) {
  return [...times].sort(compararTimes);
}

/**
 * Processa todas as partidas com resultado definido e recalcula a tabela completa.
 * @param {Array} timesIniciais - Lista de times em estado zerado (do mockData)
 * @param {Array} rodadas - Lista de rodadas com as partidas e resultados inseridos
 * @returns {Array} Tabela final ordenada com todas as estatísticas calculadas
 */
export function calcularTabela(timesIniciais, rodadas) {
  const mapaDeEstados = timesIniciais.reduce((mapa, time) => {
    mapa[time.id] = {
      ...time,
      points: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
    return mapa;
  }, {});

  rodadas.forEach((rodada) => {
    rodada.matches.forEach((partida) => {
      const { homeTeamId, awayTeamId, homeGoals, awayGoals } = partida;
      const partidaJogada =
        homeGoals !== null &&
        homeGoals !== undefined &&
        awayGoals !== null &&
        awayGoals !== undefined;

      if (partidaJogada) {
        mapaDeEstados[homeTeamId] = acumularPartida(
          mapaDeEstados[homeTeamId],
          homeGoals,
          awayGoals
        );
        mapaDeEstados[awayTeamId] = acumularPartida(
          mapaDeEstados[awayTeamId],
          awayGoals,
          homeGoals
        );
      }
    });
  });

  return ordenarTabela(Object.values(mapaDeEstados));
}
