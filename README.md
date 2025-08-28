# ME Frontend Challenge

## Site da aplicação

[me-frontend-challenge.netlify.app](https://me-frontend-challenge.netlify.app/)

### 📋 Funcionalidades

- **Gestão de Pedidos**: Visualização detalhada de pre-orders com informações completas
- **Dados do Comprador**: Exibição de informações de contato, telefones e detalhes do pedido
- **Informações do Fornecedor**: Dados completos do supplier incluindo CNPJ e contatos
- **Gestão de Endereços**: Sistema de endereços com categorização (Ship to, Bill to, Charge to)
- **Interface Responsiva**: Layout adaptado para diferentes dispositivos
- **Estado de loading**: Foram criados Skeletons para deixar mais UI Friendly e evitar CLS enquanto os dados carregam
- **Feedback de erro**: Caso aconteça algum erro ao buscar dados, deverá aparecer um componente de erro na página

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

4. **Duplique o arquivo `.env.example` e renomeie pra `.env`**

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

Se não abrir automaticamente, o projeto estará disponível no seu navegador em `http://localhost:5173`.

### 🛠️ Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

#### Front-end

- Vue.js (v3.5.18) - **Utilizando Composition API**
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

### 📁 Estrutura do Projeto

```
src/
├── assets/             # Recursos estáticos
├── components/         # Componentes reutilizáveis
│   ├── orders/         # Componentes relacionados a pedidos
│   └── ui/             # Componentes de interface
├── composables/        # Composables Vue
├── config/             # Configurações da aplicação
├── constants/          # Constantes do projeto
├── http/               # Configurações HTTP
├── pages/              # Páginas da aplicação
├── router/             # Configuração das rotas
└── services/           # Serviços e API calls
```

### 🌐 Scripts Disponíveis

#### Build e Preview

- `npm run build`: Gera a build para produção
- `npm run preview`: Preview da build de produção

#### Qualidade de Código

- `npm run lint:check`: Verifica problemas de linting

### 🧪 Como rodar os testes

#### Testes de Unidade (Vitest)

- `npm run test`: Roda todos os testes de unidade uma única vez.
- `npm run test:unit`: Inicia o Vitest em modo de observação (watch), rodando os testes a cada alteração nos arquivos.
- `npm run test:unit -- <caminho-do-arquivo>`: Roda os testes apenas para um arquivo específico.
- `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

#### Testes E2E (Cypress)

- `npm run test:e2e`: Inicia a aplicação e executa os testes de ponta a ponta em modo headless (sem interface gráfica).
- `npm run test:e2e:dev`: Inicia a aplicação e abre a interface do Cypress para rodar os testes em modo interativo.
- `npm run test:e2e:dev -- --spec "cypress/e2e/<nome-do-arquivo>.cy.js"`: Abre o Cypress e roda os testes apenas para um arquivo específico.

### 🚀 Deploy e CI/CD

Este projeto utiliza **GitHub Actions** para integração e deploy contínuo:

- **Testes automatizados**: Executa linting, testes unitários e E2E
- **Deploy automático**: Deploy no Netlify após aprovação nos testes
- **Branch protection**: Apenas código testado é mergeado na main

O deploy é feito automaticamente no **Netlify** quando há push na branch `main`.

### 💡 Decisões Técnicas

- **Vue 3 + Composition API**: Melhor organização de código e reatividade
- **Vite**: Build tool mais rápida e moderna
- **Ofetch**: Cliente HTTP leve e moderno para requisições
- **Sass**: Pré-processador CSS para maior flexibilidade de estilização
- **Vitest + Cypress**: Cobertura completa de testes (unitários e E2E)
- **Arquitetura de Inversão de Controle (IoC) via Injeção de Dependência (DI)**: Utilizamos este padrão para desacoplar a camada de serviço da implementação do cliente HTTP. O uso de adaptadores permite que dependências como o HttpClient sejam facilmente substituídas, o que simplifica testes e futuras manutenções.

### 🎨 Divergências do layout original

- Mudança no texto de "Created at" pra "Created on" pra ficar mais natural em inglês.
- Os cards de Addresses estavam com dois padrões: um com duas colunas e o outro com uma só coluna. Acho que o correto era ter um padrão pro card na exibição das informações, pra não ficarem alturas diferentes e buracos entre as linhas conforme terem mais cards, então adotei o padrão de só uma coluna porque é mais escalável, pois se aparecerem mais propriedades ficaria mais complexo e também é melhor pra responsividade.
