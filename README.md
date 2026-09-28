# Task Manager MongoDB API

API REST desenvolvida em **TypeScript** para gerenciamento de tarefas, utilizando **MongoDB** e **Mongoose** como camada de persistência.

O projeto foi desenvolvido para a disciplina **Back-end Typescript com MongoDB [26E3_3]**, da **Pós-Graduação MBA em Engenharia e Desenvolvimento Web Full Stack**.

---

## 📌 Objetivo

Evoluir a API REST de gerenciamento de tarefas para utilizar persistência em MongoDB, aplicando conceitos de:

- Arquitetura em camadas
- Inversão de controle
- Separação de responsabilidades
- Repository Pattern
- Modelagem orientada a documentos
- MongoDB
- Mongoose
- Validação de dados
- Operações CRUD

---

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Zod
- dotenv
- tsx

---

## 🏗️ Arquitetura

O projeto foi organizado utilizando separação de responsabilidades entre as camadas de **domínio, aplicação, infraestrutura e apresentação**.

```text
src/
├── application/
│   └── services/
│       └── task.service.ts
│
├── config/
│   └── env.ts
│
├── domain/
│   ├── entities/
│   │   └── task.entity.ts
│   │
│   └── repositories/
│       └── task.repository.interface.ts
│
├── dtos/
│   ├── create-task.dto.ts
│   └── update-task.dto.ts
│
├── infrastructure/
│   ├── database/
│   │   └── mongodb.ts
│   │
│   ├── repositories/
│   │   └── mongoose-task.repository.ts
│   │
│   └── schemas/
│       └── task.schema.ts
│
├── presentation/
│   ├── controllers/
│   │   └── task.controller.ts
│   │
│   ├── middlewares/
│   │   └── validation.middleware.ts
│   │
│   └── routes/
│       └── task.routes.ts
│
├── app.ts
└── server.ts
```

---

## 🔄 Fluxo da aplicação

```text
Cliente HTTP
      ↓
    Routes
      ↓
 Controller
      ↓
 TaskService
      ↓
ITaskRepository
      ↑
MongooseTaskRepository
      ↓
   Mongoose
      ↓
   MongoDB
```

O `TaskService` depende da interface `ITaskRepository`, e não diretamente do Mongoose.

A implementação concreta do Repository é fornecida durante a composição da aplicação:

```typescript
const taskRepository = new MongooseTaskRepository();

const taskService = new TaskService(taskRepository);

const taskController = new TaskController(taskService);
```

Essa abordagem reduz o acoplamento entre as camadas e aplica o conceito de **inversão de controle**.

---

## 📦 Modelagem do domínio

A entidade `Task` representa uma tarefa dentro do domínio da aplicação.

```text
Task
├── id
├── titulo
├── descricao
├── status
├── prioridade
└── dataCriacao
```

Exemplo de uma tarefa:

```json
{
  "id": "6ab9b66ba83cf2c3b6086343",
  "titulo": "Projeto MongoDB",
  "descricao": "Desenvolver projeto da disciplina Back-end TypeScript com MongoDB",
  "status": "PENDENTE",
  "prioridade": "ALTA",
  "dataCriacao": "2026-09-28T00:35:55.737Z"
}
```

---

## 🍃 Modelagem no MongoDB

As tarefas são armazenadas no banco:

```text
task_manager
```

na coleção:

```text
tasks
```

Um documento armazenado no MongoDB possui estrutura semelhante a:

```json
{
  "_id": "ObjectId(...)",
  "titulo": "Projeto MongoDB",
  "descricao": "Desenvolver projeto da disciplina Back-end TypeScript com MongoDB",
  "status": "PENDENTE",
  "prioridade": "ALTA",
  "dataCriacao": "2026-09-28T00:35:55.737Z"
}
```

O Repository realiza o mapeamento entre o documento do MongoDB e o domínio da aplicação.

```text
MongoDB                         Domínio

_id: ObjectId(...)    ──────→  id: string
titulo                ──────→  titulo
descricao             ──────→  descricao
status                ──────→  status
prioridade            ──────→  prioridade
dataCriacao            ──────→  dataCriacao
```

---

## 🗄️ Repository Pattern

A aplicação define o contrato:

```text
ITaskRepository
```

que contém as operações necessárias para manipulação das tarefas.

```typescript
criar()
buscarTodos()
buscarPorId()
atualizar()
excluir()
```

A implementação concreta para MongoDB é realizada através de:

```text
MongooseTaskRepository
```

Dessa forma, a camada de negócio não depende diretamente do MongoDB ou do Mongoose.

---

## 🔗 Endpoints

| Método | Endpoint | Descrição | Operação Mongoose |
|---|---|---|---|
| POST | `/tasks` | Cadastrar tarefa | `TaskModel.create()` |
| GET | `/tasks` | Recuperar todas as tarefas | `TaskModel.find()` |
| GET | `/tasks/:id` | Pesquisar tarefa por ID | `TaskModel.findById()` |
| PUT | `/tasks/:id` | Atualizar tarefa | `TaskModel.findByIdAndUpdate()` |
| DELETE | `/tasks/:id` | Excluir tarefa | `TaskModel.findByIdAndDelete()` |

---

## ➕ Cadastrar tarefa

### Requisição

```http
POST /tasks
```

Body:

```json
{
  "titulo": "Projeto MongoDB",
  "descricao": "Desenvolver projeto da disciplina Back-end TypeScript com MongoDB",
  "status": "PENDENTE",
  "prioridade": "ALTA"
}
```

### Resposta

```json
{
  "id": "6ab9b66ba83cf2c3b6086343",
  "titulo": "Projeto MongoDB",
  "descricao": "Desenvolver projeto da disciplina Back-end TypeScript com MongoDB",
  "status": "PENDENTE",
  "prioridade": "ALTA",
  "dataCriacao": "2026-09-28T00:35:55.737Z"
}
```

Status HTTP:

```text
201 Created
```

---

## 🔍 Recuperar todas as tarefas

```http
GET /tasks
```

A operação utiliza:

```typescript
TaskModel.find()
```

Exemplo de resposta:

```json
[
  {
    "id": "6ab9b66ba83cf2c3b6086343",
    "titulo": "Projeto MongoDB",
    "descricao": "Desenvolver projeto da disciplina",
    "status": "PENDENTE",
    "prioridade": "ALTA",
    "dataCriacao": "2026-09-28T00:35:55.737Z"
  }
]
```

---

## 🔎 Buscar tarefa por ID

```http
GET /tasks/:id
```

A operação utiliza:

```typescript
TaskModel.findById()
```

Caso a tarefa não seja encontrada, a API retorna:

```text
404 Not Found
```

---

## ✏️ Atualizar tarefa

```http
PUT /tasks/:id
```

Exemplo:

```json
{
  "status": "EM_ANDAMENTO",
  "prioridade": "MEDIA"
}
```

A operação utiliza:

```typescript
TaskModel.findByIdAndUpdate()
```

A atualização permite modificar somente os campos desejados.

---

## 🗑️ Excluir tarefa

```http
DELETE /tasks/:id
```

A operação utiliza:

```typescript
TaskModel.findByIdAndDelete()
```

Quando a exclusão é realizada com sucesso:

```text
204 No Content
```

---

## ✅ Validação dos dados

Os dados recebidos pela API são validados utilizando **Zod**.

### Status permitidos

```text
PENDENTE
EM_ANDAMENTO
CONCLUIDA
```

### Prioridades permitidas

```text
BAIXA
MEDIA
ALTA
```

Caso os dados enviados sejam inválidos, a API retorna:

```text
400 Bad Request
```

---

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task_manager
```

> O arquivo `.env` não deve ser enviado para o GitHub.

O projeto possui um `.env.example` que pode ser utilizado como referência.

---

## 📥 Instalação

Clone o projeto:

```bash
git clone https://github.com/smarlon6/task-manager-mongodb-api.git
```

Entre na pasta:

```bash
cd task-manager-mongodb-api
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

Certifique-se de que o MongoDB esteja em execução.

Execute:

```bash
npm run dev
```

O resultado esperado é:

```text
MongoDB conectado com sucesso.
Servidor executando na porta 3000
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

## 🔎 Verificação do TypeScript

Para verificar erros de tipagem:

```bash
npm run typecheck
```

---

## 🏗️ Build

Para gerar a versão compilada:

```bash
npm run build
```

Os arquivos JavaScript serão gerados em:

```text
dist/
```

---

## 💾 Persistência

Diferentemente de uma implementação utilizando armazenamento em memória, os dados deste projeto são persistidos no **MongoDB**.

```text
API
 ↓
Repository
 ↓
Mongoose
 ↓
MongoDB
 ↓
task_manager
 ↓
tasks
```

Dessa forma, os documentos permanecem armazenados mesmo após a reinicialização da API.



---

## 📚 Requisitos demonstrados

O projeto demonstra:

- Montagem da arquitetura em camadas
- Inversão de controle
- Segmentação da camada de apresentação
- Isolamento das operações de negócio
- Isolamento das dependências externas
- Seleção de banco NoSQL
- Representação do domínio através de documentos
- Definição de tipos para o Schema
- Isolamento do acesso a dados na infraestrutura
- Repository Pattern
- Mapeamento entre MongoDB e domínio
- Utilização do ODM Mongoose
- Operações de pesquisa
- Operações de cadastro
- Operações de atualização
- Operações de exclusão

---

## 👨‍💻 Autor

**Marlon Sampaio Tunes**

**Pós-Graduação:** MBA em Engenharia e Desenvolvimento Web Full Stack

**Disciplina:** Back-end Typescript com MongoDB [26E3_3]
