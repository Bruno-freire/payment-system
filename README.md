# 🧩 Sistema de Pagamentos — API RESTful

## 📘 Visão Geral

Este projeto é uma **API RESTful** desenvolvida com **NestJS** e **TypeORM**, projetada para simular um **sistema de pagamentos simplificado**.  
A aplicação permite cadastrar clientes, criar cobranças associadas a eles e gerenciar o status de cada cobrança.

A API suporta os seguintes **métodos de pagamento**:
- **Pix**
- **Cartão de Crédito**
- **Boleto Bancário**

---

## ⚙️ Tecnologias Principais

- **Node.js / NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **Docker e Docker Compose**
- **Class-validator / Class-transformer**
- **dotenv**

---

## 🧱 Estrutura de Pastas

src/
├── core/
│ ├── database/
│ │ └── database.module.ts # Configuração do TypeORM e banco
│ └── config/
│ └── (demais configurações globais)
│
├── modules/
│ ├── customer/
│ │ ├── customer.controller.ts
│ │ ├── customer.service.ts
│ │ ├── dto/
│ │ └── entities/
│ │
│ └── charge/
│ ├── charge.controller.ts
│ ├── charge.service.ts
│ ├── dto/
│ └── entities/
│
├── app.module.ts
└── main.ts

yaml
Copiar código

Essa estrutura segue o padrão modular do NestJS, mantendo cada domínio independente e organizado.

---

## 🧩 Variáveis de Ambiente

A aplicação depende de um arquivo `.env` na raiz do projeto.  
Crie o arquivo e defina as seguintes variáveis (os valores devem ser definidos por você):

```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
Essas variáveis são usadas tanto pelo banco de dados quanto pela aplicação NestJS via TypeORM.

🐳 Executando com Docker
Certifique-se de ter Docker e Docker Compose instalados.

1️⃣ Suba os containers:
bash
Copiar código
docker compose up --build
Esse comando:

Cria o container do PostgreSQL com base nas variáveis do .env;

Cria o container da API NestJS;

Faz o link automático entre aplicação e banco.

2️⃣ Acesse a API:
arduino
Copiar código
http://localhost:3000
🚀 Rodando sem Docker (opcional)
Se desejar rodar localmente (sem containers):

bash
Copiar código
npm install
npm run start:dev
Certifique-se de que o PostgreSQL esteja rodando e que o .env esteja configurado corretamente.

🌐 Endpoints Disponíveis
🧾 Clientes (/customers)
Método	Rota	Descrição
POST	/customers	Cria um novo cliente
GET	/customers	Lista todos os clientes
GET	/customers/:id	Retorna um cliente pelo ID
GET	/customers/:id/charges	Lista todas as cobranças do cliente

💰 Cobranças (/charges)
Método	Rota	Descrição
POST	/charges	Cria uma nova cobrança vinculada a um cliente
GET	/charges	Lista todas as cobranças
GET	/charges/:id	Retorna detalhes de uma cobrança
PATCH	/charges/:id/status	Atualiza o status da cobrança (PAID, FAILED, EXPIRED)

🧠 Status e Métodos Suportados
Status de cobrança:

PENDING

PAID

FAILED

EXPIRED

Métodos de pagamento:

PIX

CREDIT_CARD

BOLETO

🧪 Exemplos de Uso
Criar um Cliente
bash
Copiar código
POST /customers
{
  "name": "Bruno Freire",
  "email": "bruno@email.com",
  "document": "12345678900",
  "phone": "+55 11 98888-7777"
}
Criar uma Cobrança
bash
Copiar código
POST /charges
{
  "customerId": "UUID_DO_CLIENTE",
  "amount": 200.00,
  "currency": "BRL",
  "paymentMethod": "PIX"
}
Atualizar Status da Cobrança
bash
Copiar código
PATCH /charges/:id/status
{
  "status": "PAID"
}
🧰 Scripts úteis
bash
Copiar código
# Instalar dependências
npm install

# Rodar aplicação localmente
npm run start:dev

# Build do projeto
npm run build

# Rodar via Docker
docker compose up --build