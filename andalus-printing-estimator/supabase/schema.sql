-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text unique,
  role text default 'user'
);

-- Set up Row Level Security (RLS) for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using (true);

create policy "Users can insert their own profile."
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile."
  on profiles for update
  using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Customers Table
create table customers (
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

-- Products Table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text, -- e.g., Commercial Printing, Packaging, Large Format
  base_price numeric default 0,
  description text,
  created_at timestamp with time zone default now()
);

-- Materials Table (Paper, Die, Foil, etc.)
create table materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null, -- e.g., 'Paper', 'Die Plywood', 'Foil Plate'
  supplier text,
  cost_per_unit numeric,
  unit_type text, -- e.g., 'sheet', 'kg', 'piece', 'area_sqcm'
  gsm integer,
  sheet_size text,
  waste_percentage numeric default 0,
  available_stock numeric default 0,
  created_at timestamp with time zone default now()
);

-- Labour Table
create table labour (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  charge_type text not null, -- e.g., 'per_hour', 'per_sheet', 'per_piece', 'fixed_job'
  cost_per_unit numeric not null,
  created_at timestamp with time zone default now()
);

-- Machines Table
create table machines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  running_cost_per_hour numeric not null,
  speed_per_hour numeric,
  electricity_cost numeric,
  setup_waste numeric,
  operator_charge_per_hour numeric,
  created_at timestamp with time zone default now()
);

-- Quotations Table
create table quotations (
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

-- Quotation Items Table
create table quotation_items (
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

-- Finishing Options Table
create table finishing_options (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  material_cost numeric default 0,
  labour_charge numeric default 0,
  machine_setup_charge numeric default 0,
  minimum_charge numeric default 0,
  unit_type text,
  created_at timestamp with time zone default now()
);

-- Settings Table
create table settings (
  id uuid primary key default gen_random_uuid(),
  profit_margin numeric default 0,
  vat_rate numeric default 0,
  default_currency text default 'QAR',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for all tables
alter table customers enable row level security;
alter table products enable row level security;
alter table materials enable row level security;
alter table labour enable row level security;
alter table machines enable row level security;
alter table finishing_options enable row level security;
alter table settings enable row level security;
alter table quotations enable row level security;
alter table quotation_items enable row level security;

-- RLS Policies: Read access for everyone
create policy "Public customers are viewable by everyone." on customers for select using (true);
create policy "Public products are viewable by everyone." on products for select using (true);
create policy "Public materials are viewable by everyone." on materials for select using (true);
create policy "Public labour is viewable by everyone." on labour for select using (true);
create policy "Public machines are viewable by everyone." on machines for select using (true);
create policy "Public finishing options are viewable by everyone." on finishing_options for select using (true);
create policy "Public settings are viewable by everyone." on settings for select using (true);
create policy "Public quotations are viewable by everyone." on quotations for select using (true);
create policy "Public quotation items are viewable by everyone." on quotation_items for select using (true);

-- RLS Policies: Write access for authenticated users
create policy "Authenticated users can insert customers." on customers for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update customers." on customers for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete customers." on customers for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert products." on products for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update products." on products for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete products." on products for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert materials." on materials for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update materials." on materials for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete materials." on materials for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert labour." on labour for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update labour." on labour for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete labour." on labour for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert machines." on machines for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update machines." on machines for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete machines." on machines for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert finishing options." on finishing_options for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update finishing options." on finishing_options for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete finishing options." on finishing_options for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can insert settings." on settings for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update settings." on settings for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete settings." on settings for delete using (auth.role() = 'authenticated');

create policy "Authenticated users can manage quotations." on quotations for all using (auth.role() = 'authenticated');
create policy "Authenticated users can manage quotation items." on quotation_items for all using (auth.role() = 'authenticated');