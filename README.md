### Site da aplicação

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

---

### 🛠️ Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

**Front-end**

- Vue.js (v3.5.18) - **Utiliza a Composition API**

**Ferramentas de Desenvolvimento**

- Vite (v7.0.6)
- ESLint e Prettier

**Testes**

- Vitest (v3.2.4)
- Cypress (v14.5.3)

**Requisições HTTP**

- ofetch

**Navegação e Estilo**

- Vue Router (v4.5.1)
- Sass (v1.90.0)

### 🧪 Como rodar os testes

Para garantir o bom funcionamento da aplicação, utilize os seguintes comandos:

**Testes de Unidade (Vitest)**

- `npm run test`: Roda todos os testes de unidade uma única vez.
- `npm run test:unit`: Inicia o Vitest em modo de observação (watch), rodando os testes a cada alteração nos arquivos.
- `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.
- `npm run test:unit -- <caminho-do-arquivo>`: Roda os testes apenas para um arquivo específico.

**Testes de Ponta a Ponta (Cypress)**

- `npm run test:e2e`: Inicia a aplicação e executa os testes de ponta a ponta em modo headless (sem interface gráfica).
- `npm run test:e2e:dev`: Inicia a aplicação e abre a interface do Cypress para rodar os testes em modo interativo.
- `npm run test:e2e:dev -- --spec "cypress/e2e/<nome-do-arquivo>.cy.js"`: Abre o Cypress e roda os testes apenas para um arquivo específico.
