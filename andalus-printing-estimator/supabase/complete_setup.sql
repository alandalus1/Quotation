-- ============================================================
-- Al Andalus Printing Estimator - Complete Database Setup
-- Run this entire file in Supabase SQL Editor
-- Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE)
-- ============================================================

-- Create or replace the trigger function
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create tables if they don't exist
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text unique,
  role text default 'user'
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_person text,
  mobile text,
  email text,
  address text,
  vat_number text,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  base_price numeric default 0,
  description text,
  created_at timestamp with time zone default now()
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  supplier text,
  cost_per_unit numeric,
  unit_type text,
  gsm integer,
  sheet_size text,
  waste_percentage numeric default 0,
  available_stock numeric default 0,
  created_at timestamp with time zone default now()
);

create table if not exists labour (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  charge_type text not null,
  cost_per_unit numeric not null,
  created_at timestamp with time zone default now()
);

create table if not exists machines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  running_cost_per_hour numeric not null,
  speed_per_hour numeric,
  electricity_cost numeric,
  setup_waste numeric,
  operator_charge_per_hour numeric,
  created_at timestamp with time zone default now()
);

create table if not exists finishing_options (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  material_cost numeric default 0,
  labour_charge numeric default 0,
  machine_setup_charge numeric default 0,
  minimum_charge numeric default 0,
  unit_type text,
  created_at timestamp with time zone default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  profit_margin numeric default 0,
  vat_rate numeric default 0,
  default_currency text default 'QAR',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text unique not null,
  customer_id uuid references customers(id),
  status text default 'Pending',
  total_amount numeric,
  vat_amount numeric,
  profit_margin_percentage numeric,
  notes text,
  terms_and_conditions text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid references quotations(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  quantity integer not null,
  unit_price numeric not null,
  total_price numeric not null,
  details jsonb,
  created_at timestamp with time zone default now()
);

-- Enable RLS on all tables (safe to run multiple times)
do $$
begin
  execute 'alter table if exists profiles enable row level security';
  execute 'alter table if exists customers enable row level security';
  execute 'alter table if exists products enable row level security';
  execute 'alter table if exists materials enable row level security';
  execute 'alter table if exists labour enable row level security';
  execute 'alter table if exists machines enable row level security';
  execute 'alter table if exists finishing_options enable row level security';
  execute 'alter table if exists settings enable row level security';
  execute 'alter table if exists quotations enable row level security';
  execute 'alter table if exists quotation_items enable row level security';
end $$;

-- Drop existing policies first to avoid duplicates
do $$
declare
  policies text[] := array[
    '{"table":"profiles","policy":"Public profiles are viewable by everyone."}',
    '{"table":"profiles","policy":"Users can insert their own profile."}',
    '{"table":"profiles","policy":"Users can update own profile."}',
    '{"table":"customers","policy":"Public customers are viewable by everyone."}',
    '{"table":"customers","policy":"Authenticated users can insert customers."}',
    '{"table":"customers","policy":"Authenticated users can update customers."}',
    '{"table":"customers","policy":"Authenticated users can delete customers."}',
    '{"table":"products","policy":"Public products are viewable by everyone."}',
    '{"table":"products","policy":"Authenticated users can insert products."}',
    '{"table":"products","policy":"Authenticated users can update products."}',
    '{"table":"products","policy":"Authenticated users can delete products."}',
    '{"table":"materials","policy":"Public materials are viewable by everyone."}',
    '{"table":"materials","policy":"Authenticated users can insert materials."}',
    '{"table":"labour","policy":"Public labour is viewable by everyone."}',
    '{"table":"labour","policy":"Authenticated users can insert labour."}',
    '{"table":"machines","policy":"Public machines are viewable by everyone."}',
    '{"table":"machines","policy":"Authenticated users can insert machines."}',
    '{"table":"finishing_options","policy":"Public finishing options are viewable by everyone."}',
    '{"table":"finishing_options","policy":"Authenticated users can insert finishing options."}',
    '{"table":"settings","policy":"Public settings are viewable by everyone."}',
    '{"table":"settings","policy":"Authenticated users can insert settings."}',
    '{"table":"quotations","policy":"Public quotations are viewable by everyone."}',
    '{"table":"quotations","policy":"Authenticated users can manage quotations."}',
    '{"table":"quotation_items","policy":"Public quotation items are viewable by everyone."}',
    '{"table":"quotation_items","policy":"Authenticated users can manage quotation items."}'
  ];
  p jsonb;
  tbl text;
  pol text;
begin
  foreach p in array policies loop
    tbl := p->>'table';
    pol := p->>'policy';
    execute format('drop policy if exists %I on %I', pol, tbl);
  end loop;
end $$;

-- Create all policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "Public customers are viewable by everyone." on customers for select using (true);
create policy "Authenticated users can insert customers." on customers for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update customers." on customers for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete customers." on customers for delete using (auth.role() = 'authenticated');

create policy "Public products are viewable by everyone." on products for select using (true);
create policy "Authenticated users can insert products." on products for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update products." on products for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete products." on products for delete using (auth.role() = 'authenticated');

create policy "Public materials are viewable by everyone." on materials for select using (true);
create policy "Authenticated users can insert materials." on materials for insert with check (auth.role() = 'authenticated');

create policy "Public labour is viewable by everyone." on labour for select using (true);
create policy "Authenticated users can insert labour." on labour for insert with check (auth.role() = 'authenticated');

create policy "Public machines are viewable by everyone." on machines for select using (true);
create policy "Authenticated users can insert machines." on machines for insert with check (auth.role() = 'authenticated');

create policy "Public finishing options are viewable by everyone." on finishing_options for select using (true);
create policy "Authenticated users can insert finishing options." on finishing_options for insert with check (auth.role() = 'authenticated');

create policy "Public settings are viewable by everyone." on settings for select using (true);
create policy "Authenticated users can insert settings." on settings for insert with check (auth.role() = 'authenticated');

create policy "Public quotations are viewable by everyone." on quotations for select using (true);
create policy "Authenticated users can manage quotations." on quotations for all using (auth.role() = 'authenticated');

create policy "Public quotation items are viewable by everyone." on quotation_items for select using (true);
create policy "Authenticated users can manage quotation items." on quotation_items for all using (auth.role() = 'authenticated');

-- Drop and recreate the trigger to ensure it exists
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();