# Desafio Técnico — Cadastro de Currículos CIEE/PR

Aplicação web simples para cadastro, listagem e consulta de candidatos, com preenchimento inicial a partir de currículo em PDF.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Banco: SQL Server
- Upload: Multer
- PDF: pdf-parse
- Testes: Node.js Test Runner

## Requisitos
- Node.js 20+ recomendado
- SQL Server 2019+ (ou SQL Server Express/Developer)
- Git

## 1. Banco de dados
Abra o SQL Server Management Studio e execute `database/schema.sql`.

O script cria o banco `CIEECurriculos` e a tabela `dbo.candidatos` caso ainda não existam.

## 2. Configurar backend
```bash
cd backend
copy .env.example .env
```
No Linux/macOS, use `cp .env.example .env`.
Edite `.env` com as credenciais do SQL Server. Nunca publique o `.env`.

Depois:
```bash
npm install
npm start
```
API: `http://localhost:3001`.

## 3. Configurar frontend
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```
Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

Se a API estiver em outro endereço, crie `frontend/.env` com:
```env
VITE_API_URL=http://localhost:3001/api
```

## 4. Executar tudo pela raiz
Após instalar as dependências da raiz:
```bash
npm install
npm run install:all
npm run dev
```

## 5. Testes
Os testes do backend não exigem SQL Server porque usam um repositório em memória para validar regras e endpoints:
```bash
cd backend
npm test
```

Para validar o build do frontend:
```bash
cd frontend
npm run build
```

## Funcionalidades
- Cadastro manual.
- Validação de nome e e-mail.
- Upload somente de PDF de até 5 MB.
- Extração simples de nome, e-mail, telefone, CPF, formação e experiência.
- Campos não encontrados permanecem editáveis para preenchimento manual.
- Listagem de candidatos.
- Consulta de detalhes.
- Mensagens para arquivo inválido, PDF ilegível, validação e cadastro salvo.

## Limitações conhecidas
A extração de PDF é deliberadamente simples e baseada em texto/expressões regulares. PDFs escaneados como imagem, layouts muito diferentes, informações sem rótulos ou textos em colunas podem gerar campos vazios ou incorretos. O sistema não tenta adivinhar informações: quando não identifica um dado, o usuário pode preenchê-lo manualmente.

Os arquivos PDF não são armazenados neste MVP; o backend lê o arquivo em memória, extrai os dados e descarta o conteúdo após a requisição.

## Segurança e configuração
- Não há credenciais reais no repositório.
- `.env` está no `.gitignore`.
- O SQL usa parâmetros para evitar concatenação de valores em queries.
- O upload possui limite de 5 MB e filtro de PDF.

## Estrutura
```text
backend/       API, regras, extração de PDF e testes
frontend/      Interface React
 database/     Script SQL Server
test-data/     Currículo fictício
README.md      Instruções de execução
DESENVOLVIMENTO.md  Registro do desenvolvimento
```
