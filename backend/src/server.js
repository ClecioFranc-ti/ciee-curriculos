require('dotenv').config();
const sql = require('mssql'); const { getConfig } = require('./config'); const { CandidatoRepository } = require('./repositories/candidatoRepository'); const { createApp } = require('./app');
async function start() { const config = getConfig(); const pool = await sql.connect(config); const app = createApp(new CandidatoRepository(pool)); const port = Number(process.env.PORT || 3001); app.listen(port, () => console.log(`Backend CIEE/PR rodando em http://localhost:${port}`)); }
start().catch(err => { console.error('Não foi possível iniciar o backend:', err.message); process.exit(1); });
