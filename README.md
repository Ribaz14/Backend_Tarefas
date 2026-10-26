# Backend Tarefas

API REST para gestão de tarefas, construída com **Node.js**, **Express** e **MongoDB (Mongoose)**.

Projeto de aprendizagem com uma arquitetura em camadas: **Routes → Controllers → Services → Models**.

## Tecnologias

- [Node.js](https://nodejs.org/) 20.6 ou superior
- [Express](https://expressjs.com/) 5
- [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/)
- [CORS](https://www.npmjs.com/package/cors)

## Funcionalidades

- Criar, listar, obter, atualizar e apagar tarefas (CRUD)
- Regra de negócio: não permite tarefas com o mesmo título
- Validação do schema com Mongoose
- Middleware central de tratamento de erros
- Rota 404 para URLs inexistentes

## Estrutura do projeto

```
backendTarefas/
├── docs/
│   └── backend-tarefas.postman_collection.json   # Coleção do Postman
├── .env                           # Variáveis de ambiente (não vai para o Git)
├── .env.example                   # Exemplo das variáveis necessárias
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── server.js                      # Arranque do servidor
    ├── app.js                         # Configuração do Express
    ├── config/
    │   └── db.js                      # Ligação ao MongoDB
    ├── models/
    │   └── Tarefa.js                  # Schema da tarefa
    ├── services/
    │   └── tarefa.service.js          # Lógica de negócio e acesso aos dados
    ├── controllers/
    │   └── tarefa.controller.js       # Lê o pedido e devolve a resposta
    ├── routes/
    │   └── tarefa.routes.js           # Definição dos endpoints
    └── middlewares/
        └── erros.js                   # Tratamento de erros
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
|---|---|
| **Routes** | Define os URLs e liga-os aos controllers |
| **Controllers** | Tratam de HTTP: lêem `req`, chamam o service, devolvem `res` |
| **Services** | Lógica de negócio e acesso aos dados, sem conhecimento de HTTP |
| **Models** | Estrutura dos dados (schema do Mongoose) |

Fluxo de um pedido `POST /tarefas`:

```
Route → Controller (criar) → Service (criarTarefa) → Model → MongoDB
```

## Instalação

### 1. Pré-requisitos

- Node.js 20.6+ (`node -v`)
- MongoDB local ou uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas)

### 2. Instalar dependências

```powershell
npm install
```

### 3. Configurar variáveis de ambiente

Copia o ficheiro `.env.example` para `.env` e preenche os valores:

```powershell
copy .env.example .env
```

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta do servidor | `3000` |
| `MONGO_URI` | *Connection string* do MongoDB | `mongodb://127.0.0.1:27017/backendTarefas` |

Para o Atlas, usa a *connection string* fornecida por eles:

```
MONGO_URI=mongodb+srv://utilizador:password@cluster.mongodb.net/backendTarefas
```

> O ficheiro `.env` está no `.gitignore` e **nunca** deve ser enviado para o Git.

### 4. Executar

Modo desenvolvimento (reinicia automaticamente ao guardar):

```powershell
npm run dev
```

Modo produção:

```powershell
npm start
```

No terminal deves ver:

```
MongoDB ligado
Servidor em http://localhost:3000
```

## Endpoints

URL base: `http://localhost:3000`

| Método | Rota | Descrição | Resposta de sucesso |
|---|---|---|---|
| `GET` | `/` | Verifica se a API está a funcionar | `200` |
| `GET` | `/tarefas` | Lista todas as tarefas (mais recentes primeiro) | `200` |
| `GET` | `/tarefas/:id` | Obtém uma tarefa | `200` |
| `POST` | `/tarefas` | Cria uma tarefa | `201` |
| `PUT` | `/tarefas/:id` | Atualiza uma tarefa | `200` |
| `DELETE` | `/tarefas/:id` | Apaga uma tarefa | `204` |

> Se no teu `app.js` o prefixo for `/api/tarefas`, usa esse prefixo em todos os endpoints.

### Modelo de dados

| Campo | Tipo | Obrigatório | Notas |
|---|---|---|---|
| `titulo` | String | Sim | Sem espaços nas pontas; tem de ser único (regra do service) |
| `descricao` | String | Não | |
| `concluida` | Boolean | Não | Por defeito `false` |
| `createdAt` | Date | Automático | |
| `updatedAt` | Date | Automático | |

### Exemplos

**Criar tarefa**

```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Aprender Express",
  "descricao": "Fazer o tutorial"
}
```

Resposta `201`:

```json
{
  "_id": "64b7f0c2a1b2c3d4e5f60718",
  "titulo": "Aprender Express",
  "descricao": "Fazer o tutorial",
  "concluida": false,
  "createdAt": "2026-10-21T10:00:00.000Z",
  "updatedAt": "2026-10-21T10:00:00.000Z"
}
```

**Atualizar tarefa**

```http
PUT /tarefas/64b7f0c2a1b2c3d4e5f60718
Content-Type: application/json

{
  "concluida": true
}
```

**Apagar tarefa**

```http
DELETE /tarefas/64b7f0c2a1b2c3d4e5f60718
```

Resposta `204` (sem corpo).

## Códigos de erro

| Código | Situação | Resposta |
|---|---|---|
| `400` | Campo obrigatório em falta | `{ "erro": ["O título é obrigatório"] }` |
| `400` | ID com formato inválido | `{ "erro": "ID inválido" }` |
| `404` | Tarefa não encontrada | `{ "erro": "Tarefa não encontrada" }` |
| `404` | Rota inexistente | `{ "erro": "Rota não encontrada" }` |
| `409` | Já existe uma tarefa com esse título | `{ "erro": "Já existe uma tarefa com esse título" }` |
| `500` | Erro interno | `{ "erro": "Erro interno do servidor" }` |

## Testar a API

### Postman

A coleção com todos os pedidos está em [`docs/backend-tarefas.postman_collection.json`](docs/backend-tarefas.postman_collection.json).

1. No Postman, clica em **Import** e seleciona o ficheiro
2. Arranca o servidor (`npm run dev`)
3. Corre o pedido **Criar tarefa**: o `_id` é guardado automaticamente na variável `tarefaId`
4. Usa os restantes pedidos (listar, obter, atualizar, apagar), que já usam essa variável

URL da API: http://localhost:3000

## Melhorias futuras

- [ ] Validação de dados de entrada (zod ou joi)
- [ ] Autenticação (registo e login com bcrypt + JWT)
- [ ] Autorização (cada utilizador acede apenas às suas tarefas)
- [ ] Segurança: `helmet`, rate limiting, CORS restrito
- [ ] Paginação e filtros na listagem
- [ ] Testes automáticos (vitest + supertest)
- [ ] Logs de pedidos (morgan)
- [ ] Deploy (MongoDB Atlas + Render ou Railway)

## Licença

Projeto de aprendizagem, uso livre.