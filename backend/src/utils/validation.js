const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PDF_SIZE = 5 * 1024 * 1024;
function validarCandidato(data) {
  const erros = [];
  if (!String(data.nome || '').trim()) erros.push('Nome é obrigatório.');
  if (!String(data.email || '').trim()) erros.push('E-mail é obrigatório.');
  else if (!EMAIL_RE.test(String(data.email).trim())) erros.push('E-mail inválido.');
  return erros;
}
function normalizarCandidato(data) { return { nome: String(data.nome || '').trim(), email: String(data.email || '').trim().toLowerCase(), telefone: String(data.telefone || '').trim(), cpf: String(data.cpf || '').trim(), formacao: String(data.formacao || '').trim(), experiencia: String(data.experiencia || '').trim() }; }
module.exports = { EMAIL_RE, MAX_PDF_SIZE, validarCandidato, normalizarCandidato };
