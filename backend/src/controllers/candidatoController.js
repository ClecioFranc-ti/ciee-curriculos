const { validarCandidato, normalizarCandidato } = require('../utils/validation');
function createController(repository) {
  return {
    criar: async (req,res,next) => { try { const dados = normalizarCandidato(req.body); const erros = validarCandidato(dados); if (erros.length) return res.status(400).json({ message: 'Revise os campos obrigatórios.', errors: erros }); const salvo = await repository.criar(dados); return res.status(201).json(salvo); } catch(e) { next(e); } },
    listar: async (req,res,next) => { try { res.json(await repository.listar()); } catch(e) { next(e); } },
    obter: async (req,res,next) => { try { const id = Number(req.params.id); if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: 'ID inválido.' }); const candidato = await repository.obter(id); if (!candidato) return res.status(404).json({ message: 'Candidato não encontrado.' }); res.json(candidato); } catch(e) { next(e); } }
  };
}
module.exports = { createController };
