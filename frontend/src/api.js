import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api' });
export const listarCandidatos = () => api.get('/candidatos');
export const obterCandidato = (id) => api.get(`/candidatos/${id}`);
export const criarCandidato = (dados) => api.post('/candidatos', dados);
export const importarCurriculo = (arquivo) => {
  const form = new FormData();
  form.append('curriculo', arquivo);
  return api.post('/candidatos/importar', form);
};
export default api;
