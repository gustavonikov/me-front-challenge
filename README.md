# ME Frontend Challenge

## Site da aplicação

[me-frontend-challenge.netlify.app](https://me-frontend-challenge.netlify.app/)

### ⚙️ Como instalar e rodar o projeto

Siga os passos abaixo para instalar as dependências e executar o projeto em sua máquina local.

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gustavonikov/me-front-challenge.git
   ```

2. **Acesse o diretório do projeto:**

   ```bash
   cd me-front-challenge
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

Se não abrir automaticamente, o projeto estará disponível no seu navegador em `http://localhost:5173`.

### 🛠️ Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

#### Front-end

- Vue.js (v3.5.18) - **Utiliza a Composition API**
- Vue Router (v4.5.1)
- Sass (v1.90.0)

#### Ferramentas de Desenvolvimento

- Vite (v7.0.6)
- ESLint e Prettier

#### Requisições HTTP

- Ofetch

#### Testes

- Vitest (v3.2.4)
- Cypress (v14.5.3)
- Vitest (v3.2.4)

### 🧪 Como rodar os testes

#### Testes de Unidade (Vitest)

- `npm run test`: Roda todos os testes de unidade uma única vez.
- `npm run test:unit`: Inicia o Vitest em modo de observação (watch), rodando os testes a cada alteração nos arquivos.
- `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.
- `npm run test:unit -- <caminho-do-arquivo>`: Roda os testes apenas para um arquivo específico.

#### Testes E2E (Cypress)

- `npm run test:e2e`: Inicia a aplicação e executa os testes de ponta a ponta em modo headless (sem interface gráfica).
- `npm run test:e2e:dev`: Inicia a aplicação e abre a interface do Cypress para rodar os testes em modo interativo.
- `npm run test:e2e:dev -- --spec "cypress/e2e/<nome-do-arquivo>.cy.js"`: Abre o Cypress e roda os testes apenas para um arquivo específico.
- `npm run test:e2e:dev`: Inicia a aplicação e abre a interface do Cypress para rodar os testes em modo interativo.
- `npm run test:e2e:dev -- --spec "cypress/e2e/<nome-do-arquivo>.cy.js"`: Abre o Cypress e roda os testes apenas para um arquivo específico.

### 🎨 Divergências do layout original

- Mudança no texto de "Created at" pra "Created on" pra ficar mais natural em inglês.
- Os cards de Addresses estavam com dois padrões: um com duas colunas e o outro com uma só coluna. Acho que o correto era ter um padrão pro card na exibição das informações, pra não ficarem alturas diferentes e buracos entre as linhas conforme terem mais cards, então adotei o padrão de só uma coluna porque é mais escalável, pois se aparecerem mais propriedades ficaria mais complexo e também é melhor pra responsividade.
