const sql = require('mssql');
class CandidatoRepository {
  constructor(pool) { this.pool = pool; }
  async criar(c) { const r = await this.pool.request().input('nome', sql.NVarChar(150), c.nome).input('email', sql.NVarChar(254), c.email).input('telefone', sql.NVarChar(30), c.telefone).input('cpf', sql.NVarChar(20), c.cpf).input('formacao', sql.NVarChar(255), c.formacao).input('experiencia', sql.NVarChar(sql.MAX), c.experiencia).query(`INSERT INTO candidatos (nome,email,telefone,cpf,formacao,experiencia) OUTPUT INSERTED.* VALUES (@nome,@email,@telefone,@cpf,@formacao,@experiencia)`); return r.recordset[0]; }
  async listar() { const r = await this.pool.request().query(`SELECT id,nome,email,telefone,cpf,formacao,experiencia,created_at,updated_at FROM candidatos ORDER BY created_at DESC`); return r.recordset; }
  async obter(id) { const r = await this.pool.request().input('id', sql.Int, id).query(`SELECT id,nome,email,telefone,cpf,formacao,experiencia,created_at,updated_at FROM candidatos WHERE id=@id`); return r.recordset[0] || null; }
}
module.exports = { CandidatoRepository };
