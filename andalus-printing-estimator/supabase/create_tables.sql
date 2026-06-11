-- ============================================================
-- AL ANDALUS PRINTING ESTIMATOR - CREATE ALL TABLES & POLICIES
-- Just copy and paste this ENTIRE file into Supabase SQL Editor
-- and click RUN. That's it.
-- ============================================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text unique,
  role text default 'user'
);

-- 2. CUSTOMERS TABLE
create table if not exists public.customers (
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

-- 3. PRODUCTS TABLE
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  base_price numeric default 0,
  description text,
  created_at timestamp with time zone default now()
);

-- 4. MATERIALS TABLE
create table if not exists public.materials (
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

-- 5. LABOUR TABLE
create table if not exists public.labour (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  charge_type text not null,
  cost_per_unit numeric not null,
  created_at timestamp with time zone default now()
);

-- 6. MACHINES TABLE
create table if not exists public.machines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  running_cost_per_hour numeric not null,
  speed_per_hour numeric,
  electricity_cost numeric,
  setup_waste numeric,
  operator_charge_per_hour numeric,
  created_at timestamp with time zone default now()
);

-- 7. FINISHING OPTIONS TABLE
create table if not exists public.finishing_options (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  material_cost numeric default 0,
  labour_charge numeric default 0,
  machine_setup_charge numeric default 0,
  minimum_charge numeric default 0,
  unit_type text,
  created_at timestamp with time zone default now()
);

-- 8. SETTINGS TABLE
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  profit_margin numeric default 0,
  vat_rate numeric default 0,
  default_currency text default 'QAR',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 9. QUOTATIONS TABLE
create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text unique not null,
  customer_id uuid references public.customers(id),
  status text default 'Pending',
  total_amount numeric,
  vat_amount numeric,
  profit_margin_percentage numeric,
  notes text,
  terms_and_conditions text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 10. QUOTATION ITEMS TABLE
create table if not exists public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid references public.quotations(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null,
  unit_price numeric not null,
  total_price numeric not null,
  details jsonb,
  created_at timestamp with time zone default now()
);

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================
alter table if exists public.profiles enable row level security;
alter table if exists public.customers enable row level security;
alter table if exists public.products enable row level security;
alter table if exists public.materials enable row level security;
alter table if exists public.labour enable row level security;
alter table if exists public.machines enable row level security;
alter table if exists public.finishing_options enable row level security;
alter table if exists public.settings enable row level security;
alter table if exists public.quotations enable row level security;
alter table if exists public.quotation_items enable row level security;

-- ============================================================
-- DROP OLD POLICIES (safe to run even if they don't exist)
-- ============================================================
drop policy if exists "Public products are viewable by everyone." on public.products;
drop policy if exists "Authenticated users can insert products." on public.products;
drop policy if exists "Authenticated users can update products." on public.products;
drop policy if exists "Authenticated users can delete products." on public.products;
drop policy if exists "Public customers are viewable by everyone." on public.customers;
drop policy if exists "Authenticated users can insert customers." on public.customers;
drop policy if exists "Authenticated users can update customers." on public.customers;
drop policy if exists "Authenticated users can delete customers." on public.customers;
drop policy if exists "Public materials are viewable by everyone." on public.materials;
drop policy if exists "Authenticated users can insert materials." on public.materials;
drop policy if exists "Public labour is viewable by everyone." on public.labour;
drop policy if exists "Authenticated users can insert labour." on public.labour;
drop policy if exists "Public machines are viewable by everyone." on public.machines;
drop policy if exists "Authenticated users can insert machines." on public.machines;
drop policy if exists "Public finishing options are viewable by everyone." on public.finishing_options;
drop policy if exists "Authenticated users can insert finishing options." on public.finishing_options;
drop policy if exists "Public settings are viewable by everyone." on public.settings;
drop policy if exists "Authenticated users can insert settings." on public.settings;
drop policy if exists "Public quotations are viewable by everyone." on public.quotations;
drop policy if exists "Authenticated users can manage quotations." on public.quotations;
drop policy if exists "Public quotation items are viewable by everyone." on public.quotation_items;
drop policy if exists "Authenticated users can manage quotation items." on public.quotation_items;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

-- ============================================================
-- CREATE POLICIES (SELECT for everyone, INSERT/UPDATE/DELETE for authenticated)
-- ============================================================
-- PROFILES
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- CUSTOMERS
create policy "Public customers are viewable by everyone." on public.customers for select using (true);
create policy "Authenticated users can insert customers." on public.customers for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update customers." on public.customers for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete customers." on public.customers for delete using (auth.role() = 'authenticated');

-- PRODUCTS
create policy "Public products are viewable by everyone." on public.products for select using (true);
create policy "Authenticated users can insert products." on public.products for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update products." on public.products for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete products." on public.products for delete using (auth.role() = 'authenticated');

-- MATERIALS
create policy "Public materials are viewable by everyone." on public.materials for select using (true);
create policy "Authenticated users can insert materials." on public.materials for insert with check (auth.role() = 'authenticated');

-- LABOUR
create policy "Public labour is viewable by everyone." on public.labour for select using (true);
create policy "Authenticated users can insert labour." on public.labour for insert with check (auth.role() = 'authenticated');

-- MACHINES
create policy "Public machines are viewable by everyone." on public.machines for select using (true);
create policy "Authenticated users can insert machines." on public.machines for insert with check (auth.role() = 'authenticated');

-- FINISHING OPTIONS
create policy "Public finishing options are viewable by everyone." on public.finishing_options for select using (true);
create policy "Authenticated users can insert finishing options." on public.finishing_options for insert with check (auth.role() = 'authenticated');

-- SETTINGS
create policy "Public settings are viewable by everyone." on public.settings for select using (true);
create policy "Authenticated users can insert settings." on public.settings for insert with check (auth.role() = 'authenticated');

-- QUOTATIONS
create policy "Public quotations are viewable by everyone." on public.quotations for select using (true);
create policy "Authenticated users can manage quotations." on public.quotations for all using (auth.role() = 'authenticated');

-- QUOTATION ITEMS
create policy "Public quotation items are viewable by everyone." on public.quotation_items for select using (true);
create policy "Authenticated users can manage quotation items." on public.quotation_items for all using (auth.role() = 'authenticated');