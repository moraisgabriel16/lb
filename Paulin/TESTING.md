# 🧪 Guia de Teste - Paulinho

## ✅ Status do Backend
- **URL**: https://paulinho-back.vercel.app
- **Status**: ✅ **ONLINE**
- **API Base**: https://paulinho-back.vercel.app/api

---

## 📋 Como Testar

### 1️⃣ **Registrar um novo Professor**

```bash
curl -X POST https://paulinho-back.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prof Teste",
    "email": "prof@test.com",
    "password": "senha123",
    "role": "professor"
  }'
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Prof Teste",
    "email": "prof@test.com",
    "role": "professor"
  }
}
```

---

### 2️⃣ **Fazer Login**

```bash
curl -X POST https://paulinho-back.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "prof@test.com",
    "password": "senha123"
  }'
```

---

### 3️⃣ **Listar Alunos** (requer token)

```bash
curl -X GET https://paulinho-back.vercel.app/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 4️⃣ **Listar Turmas** (requer token)

```bash
curl -X GET https://paulinho-back.vercel.app/api/classes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 5️⃣ **Listar Avaliações** (requer token)

```bash
curl -X GET https://paulinho-back.vercel.app/api/evaluations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🌐 Frontend

**URL**: https://paulinho-front.vercel.app

O frontend está configurado para se conectar ao backend em produção!

---

## 🔧 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Registrar novo professor |
| POST | `/auth/login` | Fazer login |
| GET | `/students` | Listar alunos |
| GET | `/classes` | Listar turmas |
| POST | `/classes` | Criar turma |
| GET | `/evaluations` | Listar avaliações |
| POST | `/evaluations` | Criar avaliação |

---

## 🧬 Variáveis de Ambiente

**Frontend (`.env.production`):**
```
REACT_APP_API_URL=https://paulinho-back.vercel.app/api
```

**Backend (.env na Vercel):**
- `MONGODB_URI`: URL do MongoDB Atlas
- `JWT_SECRET`: Chave secreta para JWT
- `PORT`: 3000 (padrão Vercel)

---

## 📝 Notas Importantes

- ✅ O backend está online e respondendo
- ✅ O frontend está configurado para usar a URL correta
- ✅ Autenticação via JWT funciona
- ✅ CORS está configurado para aceitar requisições do frontend
- 🔄 Sempre inclua o token Bearer nas requisições autenticadas

---

## 🚀 Próximos Passos

1. Testar registro de professor
2. Testar login
3. Acessar https://paulinho-front.vercel.app
4. Criar turmas
5. Adicionar alunos
6. Fazer avaliações
