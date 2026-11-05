create table public.nomes (
  id bigint generated always as identity primary key,
  nome text not null check (char_length(trim(nome)) between 1 and 100),
  created_at timestamptz not null default now()
);

alter table public.nomes enable row level security;

grant select, insert on public.nomes to anon, authenticated;

create policy "nomes_select_publico" on public.nomes
  for select to anon, authenticated using (true);

create policy "nomes_insert_publico" on public.nomes
  for insert to anon, authenticated with check (char_length(trim(nome)) between 1 and 100);
