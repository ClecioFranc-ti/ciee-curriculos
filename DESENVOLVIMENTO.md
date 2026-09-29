# Registro do Desenvolvimento

## 1. Organização do trabalho

O trabalho foi dividido em pequenas etapas: definição do MVP, criação da estrutura do repositório, modelagem do SQL Server, implementação da API, implementação do frontend, importação de PDF, validações, testes e documentação.

A prioridade foi entregar um fluxo completo e simples: cadastrar candidato, importar currículo, revisar/editar os dados extraídos, salvar no SQL Server, listar e consultar detalhes.

## 2. Principais decisões técnicas

### React + Vite
Escolhidos por serem rápidos para criar uma interface pequena e organizada, com configuração mínima.

### Node.js + Express
Escolhidos para manter frontend e backend em JavaScript e reduzir a quantidade de tecnologias necessárias para compreender o projeto.

### SQL Server
É requisito explícito do desafio. O acesso é feito com `mssql` e queries parametrizadas.

### Extração de PDF por texto + regras
Não foi criada uma solução de IA para interpretar currículos. O requisito informa que a extração não precisa funcionar perfeitamente. Por isso, foi adotada uma abordagem determinística: extrair o texto do PDF e procurar padrões de nome, e-mail, telefone, CPF, formação e experiência. Quando a informação não é encontrada, o formulário permite o preenchimento manual.

### Upload em memória
O arquivo é processado em memória e não é persistido como currículo no MVP. Isso reduz a superfície de armazenamento e mantém o desafio focado na extração e cadastro.

## 3. Uso de IA

Foi utilizada IA (ChatGPT) como apoio ao desenvolvimento, principalmente para planejamento, revisão da arquitetura, elaboração de exemplos de código, identificação de casos de teste e documentação.

A IA não foi usada como substituta da validação do projeto. O código foi organizado e revisado para manter uma solução simples e compreensível.

### Exemplos de pedidos utilizados

- "Proponha uma arquitetura simples para um cadastro de currículos com React, Node.js e SQL Server."
- "Crie uma validação de e-mail e upload de PDF com limite de 5 MB."
- "Sugira testes para cadastro, consulta e importação de currículo."
- "Explique limitações de extração de texto de PDF e como permitir correção manual."

As respostas foram usadas como ponto de partida e adaptadas ao escopo do desafio. Partes consideradas desnecessárias ou complexas foram descartadas.

## 4. O que foi corrigido/adaptado

A solução foi mantida propositalmente sem autenticação, sem armazenamento permanente de PDFs, sem microsserviços e sem uma camada de IA generativa para interpretar currículos. Essas funcionalidades aumentariam a complexidade sem serem exigidas para o fluxo principal.

Também foi adotada uma separação simples entre controller, repository, serviço de PDF e validações, permitindo testar as regras sem depender de um SQL Server durante os testes automatizados.

## 5. Como a solução foi verificada

Foram previstos e implementados testes automatizados para:
- cadastro válido;
- nome obrigatório;
- e-mail inválido;
- normalização do e-mail;
- limite de 5 MB;
- endpoint de cadastro;
- rejeição de e-mail inválido na API;
- consulta de candidato inexistente.

Além dos testes automatizados, o fluxo manual esperado deve ser verificado com um cadastro, uma importação de PDF, edição dos campos não identificados, listagem e consulta de detalhes.

## 6. Tempo aproximado

Estimativa para o desenvolvimento do MVP e documentação: aproximadamente 8 a 12 horas, considerando implementação, revisão e testes. O tempo real pode variar conforme a configuração local do SQL Server e ajustes de ambiente.

## 7. Dificuldades e limitações

A principal limitação é a variedade de formatos de currículo. PDFs escaneados, documentos com duas colunas, tabelas, imagens e layouts sem rótulos podem dificultar a extração. Também existe dependência da qualidade do texto disponibilizado pelo PDF.

Outra etapa que pode exigir configuração local é a conexão com SQL Server, especialmente autenticação, porta e certificado.

## 8. Melhorias futuras

Com mais tempo, seriam consideradas:
- armazenamento seguro dos arquivos originais;
- fila de processamento para PDFs maiores;
- suporte a PDF escaneado com OCR;
- regras de extração mais abrangentes;
- testes de integração reais contra SQL Server em ambiente isolado;
- paginação e filtros na listagem;
- logs estruturados;
- autenticação e autorização caso o sistema fosse colocado em produção.

## 9. Critério de simplicidade

O projeto foi mantido como um MVP funcional e evolutivo. A intenção é que cada decisão possa ser explicada tecnicamente durante uma avaliação, sem introduzir ferramentas ou padrões que não agreguem ao requisito.
