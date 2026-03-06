# Portfolio - Leandro Tanner

**PT-BR** | [EN](#english)

## Sobre

Portfolio pessoal de Leandro Tanner, desenvolvedor Full Stack. Construido com Next.js, Tailwind CSS e TypeScript.

## Executando Localmente

```bash
# Instalar dependencias
pnpm install

# Copiar variaveis de ambiente
cp example.env .env.local

# Executar em desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de Producao

```bash
pnpm build
pnpm start
```

## Docker

```bash
# Build da imagem
docker build -t portfolio .

# Executar container
docker run -p 3000:3000 \
  -e RESEND_API_KEY=sua_chave_aqui \
  -e RESEND_TEMPLATE_ID=seu_template_id \
  portfolio

# Ou usando docker-compose
cp example.env .env.local
docker-compose up -d
```

## Variaveis de Ambiente

| Variavel | Descricao |
|----------|-----------|
| `RESEND_API_KEY` | Chave da API do Resend para envio de emails |
| `RESEND_TEMPLATE_ID` | ID do template de email no Resend |

---

<a name="english"></a>

## English

Personal portfolio of Leandro Tanner, Full Stack Developer. Built with Next.js, Tailwind CSS, and TypeScript.

## Running Locally

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp example.env .env.local

# Run in development
pnpm dev
```

Access [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
pnpm build
pnpm start
```

## Docker

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_key_here \
  -e RESEND_TEMPLATE_ID=your_template_id \
  portfolio

# Or using docker-compose
cp example.env .env.local
docker-compose up -d
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for email sending |
| `RESEND_TEMPLATE_ID` | Email template ID in Resend |

---

**License:** MIT
