-- Coaching Case: initial schema.
-- Each user only reads and writes their own rows (RLS).

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  target_firms text,
  created_at timestamptz not null default now()
);

create table public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module text not null,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, module, key)
);

create table public.activity (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  module text not null,
  label text not null,
  score numeric,
  created_at timestamptz not null default now()
);
create index activity_user_created_idx on public.activity (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.activity enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own progress" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "read own activity" on public.activity
  for select using (auth.uid() = user_id);
create policy "insert own activity" on public.activity
  for insert with check (auth.uid() = user_id);

-- Create the profile row on sign-up, using the first name passed in metadata.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, first_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
