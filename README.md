# Desafio Técnico Fullstack — Usuários & Perfis

Aplicação fullstack desenvolvida com NestJS (backend) e Next.js (frontend), utilizando TypeScript em ambos os lados e TypeORM com banco em memória (SQLite).
O projeto implementa um CRUD completo de usuários com perfis, incluindo filtros, ativação/desativação e interface web.

---

## Tecnologias Utilizadas

- Node.js + Nest
- TypeScript  
- TypeORM  
- SQLite 
- Docker & Docker Compose  
- ESLint / Prettier  
- dotenv  

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:RobsonMT/Code-Challenge-MidFalconi.git
cd Code-Challenge-MidFalconi
```

### 2. Acesse a pasta backend e instale as dependencias

```bash
cd backend/

npm install
npm run start:dev
```

### 3. Acesse a pasta frontend e crie um arquivo .env.local na raiz da pasta frontend

```bash
cd frontend/

.env.local
NEXT_PUBLIC_API_URL="http://localhost:3000"

npm install
npm run dev
```
---

## Como rodar o projeto com docker

### 1. Subindo com Docker
```bash
# Construir e iniciar containers
docker-compose up --build

# Derrubar containers
docker-compose down -v
```
### 2. A aplicação estará disponível em:
- backend: http://localhost:3000/
- Frontend: http://localhost:3001/

---

## Funcionalidades implementadas

### Backend (NestJS + TypeORM)
- CRUD completo de usuários (/users)
- CRUD de perfis (/profiles)
- Relacionamento 1:N entre Profile e User
- Ativar / desativar usuário
- Filtrar usuários por perfil
- Seed automático de dados iniciais (2 perfis + 2 usuários)
- Armazenamento em memória via SQLite
- Estrutura modular (Users, Profiles, Seed)
- Validação com DTOs (class-validator)
### Frontend (Next.js + TailwindCSS)
- Tela de listagem de usuários em tabela responsiva
- Filtro por perfil
- Criação, edição e exclusão de usuários
- Modal de confirmação para exclusão
- Toasts de feedback (sucesso/erro)
- Campos pré-carregados no modo de edição
- Destaque visual para usuários ativos/inativos
- Estilo moderno com Tailwind + sombras suaves

## Decisões técnicas

- NestJS + TypeORM: framework e ORM consolidados, facilitando modularização, tipagem e injeção de dependências.
- SQLite em memória: simplifica o ambiente, mantendo as vantagens do TypeORM sem depender de banco externo.
- Next.js (App Router) + TypeScript: garante tipagem forte e SSR (quando necessário), mantendo simplicidade no CRUD.
- TailwindCSS: acelera o desenvolvimento visual com estilização consistente e responsiva.
- react-hot-toast: fornece feedback instantâneo ao usuário para ações CRUD.
- Docker Compose: unifica ambiente com backend e frontend integrados, prontos para rodar em qualquer máquina.

## Possíveis pontos de melhoria

Autenticação e autorização: implementar login, JWT e controle de acesso por perfil.
- Persistência real: substituir SQLite in-memory por PostgreSQL (já suportado via TypeORM).
- Testes automatizados: adicionar testes unitários e de integração com Jest.
- Swagger: documentar as rotas da API com @nestjs/swagger.
- Paginação e busca: melhorar a listagem de usuários com paginação e busca por nome/email.
- UX refinado: adicionar feedbacks visuais mais dinâmicos (loaders, animações, skeletons).
- CI/CD: configurar pipeline para build e deploy automático via GitHub Actions.
