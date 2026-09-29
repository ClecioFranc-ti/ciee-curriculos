const pdfParse = require('pdf-parse');

function firstMatch(text, regexes) { for (const re of regexes) { const m = text.match(re); if (m?.[1]) return m[1].trim().replace(/[ \t]+/g, ' '); } return ''; }
function extractEmail(text) { const m = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i); return m ? m[0].toLowerCase() : ''; }
function extractName(text) {
  const labeled = firstMatch(text, [/Nome\s*(?:do candidato)?\s*[:\-]\s*([^\n\r]+)/i]);
  if (labeled) return labeled;
  const lines = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  return lines.find(l => /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{4,60}$/.test(l) && !/@/.test(l)) || '';
}
function extractPhone(text) { return firstMatch(text, [/(?:Telefone|Celular|Fone)\s*[:\-]?\s*((?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?\d{4,5}[\s-]?\d{4})/i, /((?:\(?\d{2}\)?\s*)?9?\d{4}[\s-]?\d{4})/]); }
function extractEducation(text) { return firstMatch(text, [/Forma(?:ç|c)ão\s*[:\-]\s*([^\n\r]+)/i, /(?:Gradua(?:ç|c)ão|Curso)\s*[:\-]\s*([^\n\r]+)/i]); }
function extractExperience(text) { return firstMatch(text, [/Experi(?:ê|e)ncia(?: profissional)?\s*[:\-]\s*([^\n\r]+)/i]); }
async function extractResume(buffer) {
  const parsed = await pdfParse(buffer);
  const text = parsed.text || '';
  const candidato = { nome: extractName(text), email: extractEmail(text), telefone: extractPhone(text), cpf: firstMatch(text, [/CPF\s*[:\-]\s*([\d.\-]+)/i]), formacao: extractEducation(text), experiencia: extractExperience(text) };
  const encontrados = Object.entries(candidato).filter(([,v]) => v).map(([k]) => k);
  return { candidato, textoExtraido: text, encontrados };
}
module.exports = { extractResume };
