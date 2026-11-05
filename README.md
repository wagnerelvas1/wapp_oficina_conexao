# wapp_oficina_conexao

App de teste da oficina: React + Vite + TypeScript, Supabase e deploy no Vercel.

## Rodar local

```bash
cp .env.example .env   # preencha a publishable key
npm install
npm run dev
```

## Estrutura

- `src/components/Layout.tsx` — header, sidebar e footer navegáveis
- `src/pages/Inicio.tsx` — input de nome gravando na tabela `nomes` do Supabase
- `supabase/migrations/` — SQL da tabela `nomes` (com RLS)
