const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * healthCheck - função pura (sincrona) que executa verificações simples
 * Retorna um objeto com o status geral e checks individuais
 * Observação: esta função foi mantida simples para cumprir o requisito
 * "apenas /health" — sem servir arquivos estáticos aqui.
 */
function healthCheck() {
  const checks = [];

  // Exemplo de check simples: checar que o processo está em execução
  checks.push({ name: 'process-running', ok: true });

  const allOk = checks.every((c) => c.ok === true);

  return {
    status: allOk ? 'ok' : 'fail',
    checks,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}

// Health endpoint: usa healthCheck() e retorna 200 ou 503
app.get('/health', (req, res) => {
  const report = healthCheck();
  if (report.status === 'ok') {
    return res.status(200).json(report);
  }
  return res.status(503).json(report);
});

// Não expõe outros endpoints: apenas /health
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Health server listening on port ${PORT} (endpoint: /health)`);
});
