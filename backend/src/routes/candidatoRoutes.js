const express = require('express');
const multer = require('multer');
const { MAX_PDF_SIZE } = require('../utils/validation');
const { extractResume } = require('../services/pdfExtractor');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_PDF_SIZE }, fileFilter: (req,file,cb) => { const ok = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf'); cb(ok ? null : new Error('Arquivo inválido. Envie um PDF.')); } });
function createRoutes(controller) {
  const router = express.Router();
  router.get('/', controller.listar); router.get('/:id', controller.obter); router.post('/', controller.criar);
  router.post('/importar', upload.single('curriculo'), async (req,res,next) => { try { if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo PDF foi enviado.' }); const resultado = await extractResume(req.file.buffer); res.json({ message: resultado.encontrados.length ? 'Currículo lido. Confira os campos antes de salvar.' : 'PDF lido, mas nenhuma informação foi identificada. Preencha manualmente.', candidato: resultado.candidato, camposIdentificados: resultado.encontrados }); } catch(e) { e.status = 422; e.publicMessage = 'Falha na leitura do PDF. Verifique se o arquivo é um PDF válido e contém texto selecionável.'; next(e); } });
  return router;
}
module.exports = { createRoutes };
