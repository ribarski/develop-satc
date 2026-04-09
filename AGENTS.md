# Instruções para o Agente (Desenvolvimento do Simulador do Brasileirão)

## 📌 Contexto do Projeto
Este é um projeto React + Vite recém-inicializado (boilerplate padrão). O objetivo é construir uma Single Page Application (SPA) simples, sem login e sem backend, que atue como um **Simulador de Rodadas do Campeonato Brasileiro**. 

O foco principal deste projeto **não é** ter uma interface visual extremamente complexa, mas sim ter uma **lógica de negócios impecável e 100% testável**, pois o código será submetido a análises de qualidade e cobertura de testes pelo **Sonar (SonarQube/SonarCloud)**.

## 🎯 Objetivos e Requisitos

1. **Fonte de Dados (Mockada):**
   - Não consumiremos APIs externas. Todos os dados iniciais devem vir de um arquivo estático `src/data/mockData.json`.
   - O JSON deve conter o estado inicial dos times (com zero pontos/gols) e a lista de jogos de algumas rodadas.

2. **Funcionalidades da Interface:**
   - **Tabela de Classificação:** Exibir a posição, nome do time, Pontos (P), Jogos (J), Vitórias (V), Empates (E), Derrotas (D), Gols Pró (GP), Gols Contra (GC) e Saldo de Gols (SG).
   - **Painel de Rodadas:** Permitir que o usuário selecione uma rodada (ex: Rodada 1) e veja os confrontos.
   - **Inputs de Placar:** Cada confronto deve ter inputs numéricos (ou botões de + e -) para o usuário inserir os gols do time mandante e do time visitante.

3. **O "Coração" do Sistema (A Lógica):**
   - Precisamos de uma função pura (ou um hook customizado muito bem isolado) responsável por receber a lista de times e a lista de resultados preenchidos pelo usuário, e recalcular toda a tabela.
   - **Critérios de desempate obrigatórios (nesta ordem):**
     1. Pontos (Vitória = 3, Empate = 1, Derrota = 0)
     2. Número de Vitórias
     3. Saldo de Gols (GP - GC)
     4. Gols Pró (GP)

## 🛠️ Padrões de Qualidade e Código (Foco Sonar)

- **Testabilidade:** A função que calcula a pontuação e ordena a tabela **precisa ser coberta por testes unitários**. O código deve ser escrito de forma modular para facilitar a injeção dessas simulações nos testes.
- **Evitar Complexidade Ciclomática Alta:** A lógica de ordenação e cálculo não deve ser um único bloco gigante de `if/else` ou loops aninhados profundos. Divida em funções auxiliares pequenas (ex: `calcularPontosDaPartida`, `ordenarTabela`).
- **Clean Code:** Sem variáveis não utilizadas (o ESLint já está configurado para ajudar nisso), sem `console.log` esquecidos e nomenclatura clara e em português para as regras de negócio.

## 📄 Estrutura Base do JSON (`src/data/mockData.json`)

Crie o arquivo mock seguindo esta estrutura inicial com alguns times para exemplo:

```json
{
  "teams": [
    { "id": 1, "name": "Flamengo", "points": 0, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0 },
    { "id": 2, "name": "Palmeiras", "points": 0, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0 },
    { "id": 3, "name": "Criciúma", "points": 0, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0 },
    { "id": 4, "name": "São Paulo", "points": 0, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0 }
  ],
  "rounds": [
    {
      "roundNumber": 1,
      "matches": [
        { "id": 101, "homeTeamId": 1, "awayTeamId": 3, "homeGoals": null, "awayGoals": null },
        { "id": 102, "homeTeamId": 2, "awayTeamId": 4, "homeGoals": null, "awayGoals": null }
      ]
    }
  ]
}
```

## 

1. Crie o arquivo `src/data/mockData.json` baseado na estrutura acima.
2. Crie a função principal de cálculo e ordenação da tabela (isole isso em um arquivo como `src/utils/tableCalculator.js`).
3. Limpe o `App.jsx` atual e implemente a interface visual dividida em componentes (ex: `<StandingsTable />` e `<MatchSimulator />`).
4. Garanta que o estado da aplicação reaja dinamicamente assim que um placar for alterado.