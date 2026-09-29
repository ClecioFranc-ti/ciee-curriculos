const required = ['DB_SERVER','DB_DATABASE','DB_USER','DB_PASSWORD'];
function getConfig() {
  const cfg = { server: process.env.DB_SERVER, database: process.env.DB_DATABASE || 'CIEECurriculos', user: process.env.DB_USER, password: process.env.DB_PASSWORD, port: Number(process.env.DB_PORT || 1433), encrypt: String(process.env.DB_ENCRYPT || 'false').toLowerCase() === 'true', trustServerCertificate: String(process.env.DB_TRUST_SERVER_CERTIFICATE || 'true').toLowerCase() === 'true' };
  if (required.some(k => !process.env[k])) throw new Error('Configuração do SQL Server ausente. Copie .env.example para .env e preencha as variáveis.');
  return cfg;
}
module.exports = { getConfig };
