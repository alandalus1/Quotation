-- ============================================================
-- AL ANDALUS PRINTING ESTIMATOR - TABLES + POLICIES ONLY
-- NO functions, NO triggers, NO profiles table
-- Just the 9 business tables needed for the app to work
-- ============================================================

-- 1. CUSTOMERS TABLE
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

-- 2. PRODUCTS TABLE
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  base_price numeric default 0,
  description text,
  created_at timestamp with time zone default now()
);

-- 3. MATERIALS TABLE
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

-- 4. LABOUR TABLE
create table if not exists public.labour (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  charge_type text not null,
  cost_per_unit numeric not null,
  created_at timestamp with time zone default now()
);

-- 5. MACHINES TABLE
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

-- 6. FINISHING OPTIONS TABLE
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

-- 7. SETTINGS TABLE
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  profit_margin numeric default 0,
  vat_rate numeric default 0,
  default_currency text default 'QAR',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 8. QUOTATIONS TABLE
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

-- 9. QUOTATION ITEMS TABLE
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
-- ENABLE RLS
-- ============================================================
do $$
begin
  execute 'alter table if exists public.customers enable row level security';
  execute 'alter table if exists public.products enable row level security';
  execute 'alter table if exists public.materials enable row level security';
  execute 'alter table if exists public.labour enable row level security';
  execute 'alter table if exists public.machines enable row level security';
  execute 'alter table if exists public.finishing_options enable row level security';
  execute 'alter table if exists public.settings enable row level security';
  execute 'alter table if exists public.quotations enable row level security';
  execute 'alter table if exists public.quotation_items enable row level security';
end $$;

-- ============================================================
-- DROP EXISTING POLICIES (safe)
-- ============================================================
do $$
declare
  rec record;
begin
  for rec in (
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
    and tablename in ('customers','products','materials','labour','machines','finishing_options','settings','quotations','quotation_items')
  ) loop
    execute format('drop policy if exists %I on %I.%I', rec.policyname, rec.schemaname, rec.tablename);
  end loop;
end $$;

-- ============================================================
-- POLICIES - public read, authenticated write
-- ============================================================
create policy "read_all" on public.customers for select using (true);
create policy "insert_auth" on public.customers for insert with check (auth.role() = 'authenticated');
create policy "update_auth" on public.customers for update using (auth.role() = 'authenticated');
create policy "delete_auth" on public.customers for delete using (auth.role() = 'authenticated');

create policy "read_all" on public.products for select using (true);
create policy "insert_auth" on public.products for insert with check (auth.role() = 'authenticated');
create policy "update_auth" on public.products for update using (auth.role() = 'authenticated');
create policy "delete_auth" on public.products for delete using (auth.role() = 'authenticated');

create policy "read_all" on public.materials for select using (true);
create policy "insert_auth" on public.materials for insert with check (auth.role() = 'authenticated');

create policy "read_all" on public.labour for select using (true);
create policy "insert_auth" on public.labour for insert with check (auth.role() = 'authenticated');

create policy "read_all" on public.machines for select using (true);
create policy "insert_auth" on public.machines for insert with check (auth.role() = 'authenticated');

create policy "read_all" on public.finishing_options for select using (true);
create policy "insert_auth" on public.finishing_options for insert with check (auth.role() = 'authenticated');

create policy "read_all" on public.settings for select using (true);
create policy "insert_auth" on public.settings for insert with check (auth.role() = 'authenticated');

create policy "read_all" on public.quotations for select using (true);
create policy "manage_auth" on public.quotations for all using (auth.role() = 'authenticated');

create policy "read_all" on public.quotation_items for select using (true);
create policy "manage_auth" on public.quotation_items for all using (auth.role() = 'authenticated');