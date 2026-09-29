const test = require('node:test'); const assert = require('node:assert/strict');
const { validarCandidato, normalizarCandidato, MAX_PDF_SIZE } = require('../src/utils/validation');
test('aceita candidato com nome e e-mail válidos', () => assert.deepEqual(validarCandidato({nome:'Ana',email:'ana@example.com'}), []));
test('rejeita nome vazio', () => assert.ok(validarCandidato({nome:'',email:'ana@example.com'}).includes('Nome é obrigatório.')));
test('rejeita e-mail inválido', () => assert.ok(validarCandidato({nome:'Ana',email:'ana@'}).includes('E-mail inválido.')));
test('normaliza e-mail', () => assert.equal(normalizarCandidato({nome:' Ana ',email:' ANA@EXAMPLE.COM '}).email,'ana@example.com'));
test('limite do PDF é 5 MB', () => assert.equal(MAX_PDF_SIZE, 5 * 1024 * 1024));
