const express = require('express'); const cors = require('cors'); const helmet = require('helmet');
const { createRoutes } = require('./routes/candidatoRoutes'); const { errorHandler } = require('./middleware/errorHandler');
function createApp(repository) { const app = express(); app.use(helmet()); app.use(cors()); app.use(express.json({ limit: '1mb' })); app.get('/api/health', (req,res) => res.json({ status: 'ok' })); app.use('/api/candidatos', createRoutes(require('./controllers/candidatoController').createController(repository))); app.use(errorHandler); return app; }
module.exports = { createApp };
