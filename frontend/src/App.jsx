import { useEffect, useState } from 'react';
import { criarCandidato, importarCurriculo, listarCandidatos, obterCandidato } from './api';

const vazio = { nome: '', email: '', telefone: '', cpf: '', formacao: '', experiencia: '' };

function App() {
  const [form, setForm] = useState(vazio);
  const [arquivo, setArquivo] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const carregarLista = async () => {
    try { const { data } = await listarCandidatos(); setCandidatos(data); }
    catch (e) { setMensagem({ tipo: 'erro', texto: e.response?.data?.message || 'Não foi possível carregar a lista.' }); }
  };
  useEffect(() => { carregarLista(); }, []);

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const salvar = async (e) => {
    e.preventDefault(); setMensagem(null); setCarregando(true);
    try { await criarCandidato(form); setMensagem({ tipo: 'sucesso', texto: 'Cadastro salvo com sucesso.' }); setForm(vazio); setArquivo(null); document.getElementById('curriculo').value = ''; await carregarLista(); }
    catch (err) { setMensagem({ tipo: 'erro', texto: err.response?.data?.message || 'Falha ao salvar cadastro.' }); }
    finally { setCarregando(false); }
  };
  const importar = async () => {
    if (!arquivo) return setMensagem({ tipo: 'erro', texto: 'Selecione um arquivo PDF.' });
    setMensagem(null); setCarregando(true);
    try { const { data } = await importarCurriculo(arquivo); setForm({ ...vazio, ...data.candidato }); setMensagem({ tipo: 'sucesso', texto: data.message || 'Currículo lido. Confira e complete os campos antes de salvar.' }); }
    catch (err) { setMensagem({ tipo: 'erro', texto: err.response?.data?.message || 'Falha na leitura do currículo.' }); }
    finally { setCarregando(false); }
  };
  const detalhes = async (id) => { try { const { data } = await obterCandidato(id); setSelecionado(data); } catch (e) { setMensagem({ tipo: 'erro', texto: e.response?.data?.message || 'Falha ao consultar candidato.' }); } };

  return <main className="container">
    <header><div><p className="eyebrow">Desafio técnico • CIEE/PR</p><h1>Cadastro de Currículos</h1><p className="sub">Cadastro manual ou preenchimento inicial a partir de um PDF.</p></div><span className="badge">SQL Server</span></header>
    {mensagem && <div className={`alert ${mensagem.tipo}`}>{mensagem.texto}</div>}
    <section className="grid">
      <div className="card">
        <h2>1. Importar currículo</h2><p className="hint">PDF de até 5 MB. A extração é assistida por regras simples; confirme os dados antes de salvar.</p>
        <div className="upload"><input id="curriculo" type="file" accept="application/pdf,.pdf" onChange={e => setArquivo(e.target.files?.[0] || null)} /><button type="button" onClick={importar} disabled={carregando}>{carregando ? 'Processando...' : 'Ler PDF'}</button></div>
      </div>
      <form className="card" onSubmit={salvar}>
        <h2>2. Dados do candidato</h2>
        <label>Nome *<input name="nome" value={form.nome} onChange={alterar} required /></label>
        <label>E-mail *<input name="email" type="email" value={form.email} onChange={alterar} required /></label>
        <div className="two"><label>Telefone<input name="telefone" value={form.telefone} onChange={alterar} /></label><label>CPF<input name="cpf" value={form.cpf} onChange={alterar} /></label></div>
        <label>Formação<input name="formacao" value={form.formacao} onChange={alterar} /></label>
        <label>Experiência<textarea name="experiencia" rows="4" value={form.experiencia} onChange={alterar} /></label>
        <button className="primary" disabled={carregando}>{carregando ? 'Salvando...' : 'Salvar candidato'}</button>
      </form>
    </section>
    <section className="card"><div className="section-head"><div><h2>3. Candidatos cadastrados</h2><p className="hint">Lista persistida no SQL Server.</p></div><button onClick={carregarLista}>Atualizar</button></div>
      <div className="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th></th></tr></thead><tbody>{candidatos.length ? candidatos.map(c => <tr key={c.id}><td>{c.nome}</td><td>{c.email}</td><td>{c.telefone || '—'}</td><td><button className="link" onClick={() => detalhes(c.id)}>Ver detalhes</button></td></tr>) : <tr><td colSpan="4" className="empty">Nenhum candidato cadastrado.</td></tr>}</tbody></table></div>
    </section>
    {selecionado && <div className="modal-backdrop" onClick={() => setSelecionado(null)}><div className="modal" onClick={e => e.stopPropagation()}><div className="section-head"><h2>Detalhes</h2><button onClick={() => setSelecionado(null)}>Fechar</button></div><dl>{Object.entries({Nome: selecionado.nome, 'E-mail': selecionado.email, Telefone: selecionado.telefone, CPF: selecionado.cpf, Formação: selecionado.formacao, Experiência: selecionado.experiencia}).map(([k,v]) => <div key={k}><dt>{k}</dt><dd>{v || 'Não informado'}</dd></div>)}</dl></div></div>}
    <footer>Projeto demonstrativo • Não contém credenciais reais.</footer>
  </main>;
}
export default App;
